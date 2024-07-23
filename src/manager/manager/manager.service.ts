import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerEntity } from 'src/manager/manager/entities/manager.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class ManagerService {

 constructor(@InjectRepository (ManagerEntity) private readonly  managerRepository : Repository <ManagerEntity>){}


 async create(createManagerDto: Partial <ManagerEntity> ){

    const manager = this.managerRepository.create(createManagerDto)
    return await this.managerRepository.save(manager)
  }



 async findAll() : Promise <ManagerEntity[]> {

   
    return await this.managerRepository.find({

      relations:[
        'instituteName',
        'department',
        'semister',
      ]
    })
  }


  async searchByQuery(
    
    offset: number = 0,
    limit: number = 10,
    query: string,
  ): Promise<Pagination<ManagerEntity>> {
    const queryBuilder = this.managerRepository.createQueryBuilder('Manager')
    .leftJoinAndSelect('Manager.instituteName', 'instituteName')
    .leftJoinAndSelect('Manager.department', 'department')
    .leftJoinAndSelect('Manager.semister', 'semister');
    
    if (query) {
      queryBuilder.where('LOWER(Manager.name) LIKE :query', { query: `%${query.toLowerCase()}%` });
    }
    
    queryBuilder.skip(offset).take(limit).orderBy('Manager.name', 'DESC');
  
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
  

 async  findOne(id: number) {
   
     const manager = await this.managerRepository.findOne({where : {id},
      relations:[
        'instituteName',
        'department',
        'semister',
      ]
    })

    if(!manager){

      throw new NotFoundException(`Manager with ID ${id} not found`);
    }

    return manager
  }




  async update(id: number, updateManagerDto: UpdateManagerDto ) {
    const existingManager = await this.managerRepository.findOne({
      where: { id },
    });

    if (!existingManager) {
      throw new NotFoundException('Item not found');
    }

    await this.managerRepository.merge(
      existingManager,
      updateManagerDto,
    );

    return await this.managerRepository.save(existingManager);
  }


  async remove(id: number) : Promise <void>  {
   
    const result = await this.managerRepository.delete(id)

    if(result.affected === 0){
      throw new NotFoundException(`Manager with ID ${id} not found`);
    }
  }


  
    // disable

    async disable(id: number) {
      const item = await this.managerRepository.findOne({
        where: { id },
      });
      console.log(';ggggg',item)
      if (!item) {
        throw new Error('item not found');
      }
  
      return await this.managerRepository.update(id, {
        status: 0,
      });
    }
  
    
    // enable
    async enable(id: number) {
      const item = await this.managerRepository.findOne({
        where: { id },
      });
      
   
      if (!item) {
        throw new Error('item not found');
      }
      
  
      return await this.managerRepository.update(id, {
        status: 1,
      });
    }



}
