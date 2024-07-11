import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from './entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  
// inject repo

  constructor(@InjectRepository(DepartmentEntity) private readonly departmentRepoistry : Repository <DepartmentEntity>){

  }
 async create(createDepartmentDto: CreateDepartmentDto) : Promise <DepartmentEntity> {

     const department = this.departmentRepoistry.create(createDepartmentDto)
    return await this.departmentRepoistry.save(department)
  }

  async findAll() :  Promise <DepartmentEntity []> {
    return this.departmentRepoistry.find()
  }

  async searchByQuery(query: string): Promise<DepartmentEntity[]> {
    const queryBuilder = this.departmentRepoistry.createQueryBuilder('pref');
  
    
    if (query) {
      queryBuilder.where('LOWER(pref.name) LIKE :query', { query: `%${query.toLowerCase()}%` });
    }
  
   
    queryBuilder.orderBy('"pref"."name"', 'DESC');
  
 console.log(query)


    const  items = await queryBuilder.getMany();
    console.log(items)
    return items;
  
  }

 async findOne(id: number) {

  const department = this.departmentRepoistry.findOne({where : {id}})

  if(!department){

   throw new NotFoundException(`Department with ID ${id} not found`)
  }

  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto ): Promise <DepartmentEntity> {
   const department = await this.departmentRepoistry.preload({

    id,
    ...updateDepartmentDto
   })
   if(!department){


    throw new NotFoundException(`Department with ID ${id} not found`)
   }

   return this.departmentRepoistry.save(department)


  }

 async  remove(id: number) : Promise <void> {
   const result = await this.departmentRepoistry.delete(id)
   if(result.affected === 0){

    throw new NotFoundException(`Institute with ID ${id} not found`)
  }
  }


   // disable

   async disable(id: number) {
    const item = await this.departmentRepoistry.findOne({
      where: { id },
    });

    if (!item) {
      throw new Error('item not found');
    }

    return await this.departmentRepoistry.update(id, {
      status: 0,
    });
  }
  // enable
  async enable(id: number) {
    const item = await this.departmentRepoistry.findOne({
      where: { id },
    });

    if (!item) {
      throw new Error('item not found');
    }

    return await this.departmentRepoistry.update(id, {
      status: 1,
    });
  }
}
