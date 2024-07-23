import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBloodDto } from './dto/create-blood.dto';
import { UpdateBloodDto } from './dto/update-blood.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BloodEntity } from './entities/blood.entity';
import { Like, Repository } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';

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






  async searchByQuery(
    
    offset: number = 0,
    limit: number = 10,
    query: string,
  ): Promise<Pagination<BloodEntity>> {
    const queryBuilder = this.bloodRepoistry.createQueryBuilder('pref');
    
    if (query) {
      queryBuilder.where('LOWER(pref.name) LIKE :query', { query: `%${query.toLowerCase()}%` });
    }
    
    queryBuilder.skip(offset).take(limit).orderBy('pref.name', 'DESC');
  
    console.log(query);
  
    const [items, total] = await queryBuilder.getManyAndCount();
    console.log(items);
    
    return {
      items,
      meta: {
        itemCount: items.length,
        totalItems: total,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: Math.floor(offset / limit) + 1,
      },
    };
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

   // disable

   async disable(id: number) {
    const item = await this.bloodRepoistry.findOne({
      where: { id },
    });
    console.log(';ggggg',item)
    if (!item) {
      throw new Error('item not found');
    }

    return await this.bloodRepoistry.update(id, {
      status: 0,
    });
  }

  
  // enable
  async enable(id: number) {
    const item = await this.bloodRepoistry.findOne({
      where: { id },
    });
    
 
    if (!item) {
      throw new Error('item not found');
    }
    

    return await this.bloodRepoistry.update(id, {
      status: 1,
    });
  }

  }

