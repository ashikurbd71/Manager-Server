import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBazalistDto } from './dto/create-bazalist.dto';
import { UpdateBazalistDto } from './dto/update-bazalist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BazalistEntity } from './entities/bazalist.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class BazalistService {

  constructor(@InjectRepository(BazalistEntity) private readonly bazalistRepository : Repository <BazalistEntity> ) { }


 async create(createBazalistDto: CreateBazalistDto): Promise<BazalistEntity> {

   const bazarlist = this.bazalistRepository.create(createBazalistDto)
    return  await this.bazalistRepository.save(bazarlist)
  }

 async findAll():Promise <BazalistEntity []> {

   
    return await this.bazalistRepository.find()
  }

  
  async searchByQuery(
    
    offset: number = 0,
    limit: number = 10,
    query: string,
  ): Promise<Pagination<BazalistEntity>> {
    const queryBuilder = this.bazalistRepository.createQueryBuilder('pref');
    
    if (query) {
      queryBuilder.where('LOWER(pref.date) LIKE :query', { query: `%${query.toLowerCase()}%` });
    }
    
    queryBuilder.skip(offset).take(limit).orderBy('pref.date', 'DESC');
  
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
  

  async findOne(id: number) :  Promise <BazalistEntity> {
    
     const bazarlist = await this.bazalistRepository.findOne({where : { id }})

     if (!bazarlist) {
      throw new NotFoundException(`bazarlist with ID ${id} not found`);
    }
    return bazarlist;
  }


// Update an existing institute
  async update(id: number, updateBazarlistDto: UpdateBazalistDto): Promise<BazalistEntity> {
    // Attempt to preload the Bazarlist with the given ID and updated data
    const Bazarlist = await this.bazalistRepository.preload({
      id,
      ...updateBazarlistDto,
    });
    // If no Bazarlist is found, throw a NotFoundException
    if (!Bazarlist) {
      throw new NotFoundException(`Bazarlist with ID ${id} not found`);
    }
    // Save the updated Bazarlist entity and return the result
    return await this.bazalistRepository.save(Bazarlist);
  }

  // Remove an institute by ID
  async remove(id: number): Promise<void> {
    const result = await this.bazalistRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`bazarlist with ID ${id} not found`);
    }
  }
}
