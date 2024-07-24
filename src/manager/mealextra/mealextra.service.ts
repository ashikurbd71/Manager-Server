import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMealextraDto } from './dto/create-mealextra.dto';
import { UpdateMealextraDto } from './dto/update-mealextra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MealextraEntity } from './entities/mealextra.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class MealextraService {

 
  constructor(@InjectRepository(MealextraEntity) private readonly mealextraRepository : Repository <MealextraEntity>){}

  async create(createMealextraDto: CreateMealextraDto) : Promise <MealextraEntity> {

     const mealextra = this.mealextraRepository.create(createMealextraDto)
    return await this.mealextraRepository.save(mealextra)
  }

 async findAll() : Promise <MealextraEntity[]>  {
    return await this.mealextraRepository.find()
  }


  async searchByQuery(
    offset: number = 0,
    limit: number = 10,
    query: string,
  ): Promise<Pagination<MealextraEntity>> {
    const queryBuilder = this.mealextraRepository.createQueryBuilder('meal');

    if (query) {
      queryBuilder.where('LOWER(meal.date) LIKE :query', { query: `%${query.toLowerCase()}%` });
    }

    queryBuilder.skip(offset).take(limit).orderBy('meal.date', 'DESC');

    // Fetch items and total count
    const [items, total] = await queryBuilder.getManyAndCount();

    // Calculate total extraMoney
    const totalExtraMoney = items.reduce((acc, item) => acc + parseFloat(item.extraMoney), 0);

    return {
      items,
      meta: {
        itemCount: items.length,
        totalItems: total,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: Math.floor(offset / limit) + 1,
        totalExtraMoney, // Add totalExtraMoney to metadata
      },
    };
  }
  


 async findOne(id: number) :Promise <MealextraEntity> {

     const mealextra = await this.mealextraRepository.findOne({where : {id}})
     if(!mealextra){
      throw new NotFoundException(`Institute with ID ${id} not found`);
     }
     return mealextra
  }


  // Update an existing institute
  async update(id: number, updatemealextraDto: UpdateMealextraDto): Promise<MealextraEntity> {
    // Attempt to preload the institute with the given ID and updated data
    const institute = await this.mealextraRepository.preload({
      id,
      ...updatemealextraDto,
    });
    // If no institute is found, throw a NotFoundException
    if (!institute) {
      throw new NotFoundException(`Mealextra with ID ${id} not found`);
    }
    // Save the updated institute entity and return the result
    return await this.mealextraRepository.save(institute);
  }

  async remove(id: number) : Promise< void> {
    const result = await this.mealextraRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }




}
