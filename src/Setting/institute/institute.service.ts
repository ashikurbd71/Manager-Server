import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InstituteEntity } from './entities/institute.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InstituteService {

    // inject repo 

    constructor(@InjectRepository(InstituteEntity) private readonly instituteRepoistry : Repository <InstituteEntity>){

    }

  async create(createInstituteDto: CreateInstituteDto) : Promise <InstituteEntity> {

     const institute = this.instituteRepoistry.create(createInstituteDto)
     return await this.instituteRepoistry.save(institute)
   
  }

  async findAll() : Promise <InstituteEntity []> {
    
    return await this.instituteRepoistry.find()
  }

  findOne(id: number) {
    const institute = this.instituteRepoistry.findOne({where : {id}})
    if(!institute){

       throw new NotFoundException(`Institute with ID ${id} not found`);
    }
  }
  async update(id: number, updateInstituteDto: UpdateInstituteDto): Promise<InstituteEntity> {
    // Attempt to preload the institute with the given ID and updated data
    const institute = await this.instituteRepoistry.preload({
      id,
      ...updateInstituteDto
    });
  
    // If no institute is found, throw a NotFoundException
    if (!institute) {
      throw new NotFoundException(`Institute with ID ${id} not found`);
    }
  
    // Save the updated institute entity and return the result
    return await this.instituteRepoistry.save(institute);
  }
  

  async remove(id: number) : Promise < void> {
    const result = await this.instituteRepoistry.delete(id)

    if(result.affected === 0){

      throw new NotFoundException(`Institute with ID ${id} not found`)
    }
  }
}
