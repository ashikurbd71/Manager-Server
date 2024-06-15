import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBloodDto } from './dto/create-blood.dto';
import { UpdateBloodDto } from './dto/update-blood.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BloodEntity } from './entities/blood.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BloodService {

  constructor(@InjectRepository(BloodEntity) private readonly bloodRepoistry: Repository <BloodEntity>){


  }

 async create(createBloodDto: CreateBloodDto) : Promise <BloodEntity> {
     const blood = this.bloodRepoistry.create(createBloodDto)

      return await this.bloodRepoistry.save(blood)
  }

 async findAll() : Promise <BloodEntity []> {
    return this.bloodRepoistry.find() 
  }

   // নাম দিয়ে সার্চ করার মেথড
   async searchByName(searchDto: CreateBloodDto): Promise<BloodEntity[]> {
    const { name } = searchDto;

    // যদি সার্চ ক্রাইটেরিয়া না থাকে তাহলে সব রেজাল্ট রিটার্ন করবে
    if (!name) {
      return this.bloodRepoistry.find();
    }

    // QueryBuilder ব্যবহার করে নাম দিয়ে সার্চ (কেস ইনসেন্সিটিভ সার্চ)
    return this.bloodRepoistry.createQueryBuilder('blood')
      .where('LOWER(blood.name) LIKE :name', { name: `%${name.toLowerCase()}%` })
      .getMany();
  }


 async findOne(id: number) {
    const blood = this.bloodRepoistry.findOne({where : {id}})

    if(!blood){

      throw new NotFoundException(`Blood with ID ${id} not found`)
    }
  }

  async update(id: number, updateBloodDto: UpdateBloodDto) : Promise <BloodEntity> {
    const blood = await this.bloodRepoistry.preload({

      id,
  ...updateBloodDto
    })

    if(!blood){

      throw new NotFoundException(`Blood with ID ${id} not found`)
    }

    return this.bloodRepoistry.save(blood)
  }

  async remove(id: number) : Promise <void> {
   const result =  await this.bloodRepoistry.delete(id)
   if(result .affected === 0){

    throw new NotFoundException(`Blood with ID ${id} not found`)
  }
   }
  }

