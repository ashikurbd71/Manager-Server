import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSemisterDto } from './dto/create-semister.dto';
import { UpdateSemisterDto } from './dto/update-semister.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SemisterEntity } from './entities/semister.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SemisterService {

  constructor(@InjectRepository(SemisterEntity) private readonly semisterRepoistry : Repository <SemisterEntity>){
    
  }
  async create(createSemisterDto: CreateSemisterDto) : Promise <SemisterEntity> {

    const semister = this.semisterRepoistry.create(createSemisterDto)
    return await this.semisterRepoistry.save(semister)
  }

  async findAll() : Promise <SemisterEntity []> {
    return this.semisterRepoistry.find()
  }

    
  async searchByQuery(query: string): Promise<SemisterEntity[]> {
    const queryBuilder = this.semisterRepoistry.createQueryBuilder('pref');
  
    
    if (query) {
      queryBuilder.where('LOWER(pref.name) LIKE :query', { query: `%${query.toLowerCase()}%` });
    }
  
   
    queryBuilder.orderBy('"pref"."name"', 'DESC');
  
    console.log(query)


    const  items = await queryBuilder.getMany();
    console.log(items)
    return items;
  
  }
  

  async findOne(id: number){
   const semister = this.semisterRepoistry.findOne({where : {id}})

      if(!semister){
        throw new NotFoundException(`Semister with ID ${id} not found`)

      }
  }

  async update(id: number, updateSemisterDto: UpdateSemisterDto) : Promise <SemisterEntity> {
     const semister = await this.semisterRepoistry.preload({

      id,
      ...updateSemisterDto
     })

     if(!semister){
      throw new NotFoundException(`Semister with ID ${id} not found`)
     }

     return this.semisterRepoistry.save(semister)
  }

  async  remove(id: number) : Promise <void> {
    const result = await this.semisterRepoistry.delete(id)
    if(result.affected === 0){
 
     throw new NotFoundException(`Institute with ID ${id} not found`)
   }
   }


   // disable

   async disable(id: number) {
    const item = await this.semisterRepoistry.findOne({
      where: { id },
    });

    if (!item) {
      throw new Error('item not found');
    }

    return await this.semisterRepoistry.update(id, {
      status: 0,
    });
  }
  // enable
  async enable(id: number) {
    const item = await this.semisterRepoistry.findOne({
      where: { id },
    });

    if (!item) {
      throw new Error('item not found');
    }

    return await this.semisterRepoistry.update(id, {
      status: 1,
    });
  }
}
