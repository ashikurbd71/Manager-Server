import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from './entities/department.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';

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

  async searchByQuery(
    
    offset: number = 0,
    limit: number = 10,
    query: string,
  ): Promise<Pagination<DepartmentEntity>> {
    const queryBuilder = this.departmentRepoistry.createQueryBuilder('pref');
    
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
    console.log(';ggggg',item)
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
