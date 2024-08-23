import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable()


export class ImageService {

 constructor( @InjectRepository (ImageEntity) private readonly imaeRepository : Repository <ImageEntity>) { }


 async create(createImageDto: Partial <ImageEntity>) {

     const image = this.imaeRepository.create(createImageDto);

      return await this.imaeRepository.save(image);
   
  }

 async findAll() : Promise <ImageEntity []> {
    return await this.imaeRepository.find()
  }


  async searchByQuery(
    
    offset: number = 0,
    limit: number = 10,
    query: string,
  ): Promise<Pagination<ImageEntity>> {
    const queryBuilder = this.imaeRepository.createQueryBuilder('image')
 
    if (query) {
      queryBuilder.where('LOWER(image.email) LIKE :query', { query: `%${query.toLowerCase()}%` });
    }
    
    queryBuilder.skip(offset).take(limit).orderBy('image.email', 'DESC');
  
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
    
    const image = await this.imaeRepository.findOne({where : {id} })

    if(!image){
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return image;
  }



  async update(id: number, UpdateImageDto: UpdateImageDto) {
    const existingimage = await this.imaeRepository.findOne({
      where: { id },
    });

    if (!existingimage) {
      throw new NotFoundException('Item not found');
    }

    await this.imaeRepository.merge(
      existingimage,
      UpdateImageDto,
    );

    return await this.imaeRepository.save(existingimage);
  }


  async remove(id: number) : Promise< void> {
    const result = await this.imaeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }


    // disable

   async disable(id: number) {
    const item = await this.imaeRepository.findOne({
      where: { id },
    });
    console.log('ggggg',item)
    if (!item) {
      throw new Error('item not found');
    }

    return await this.imaeRepository.update(id, {
      status: 0,
    });
  }

  
  // enable
  async enable(id: number) {
    const item = await this.imaeRepository.findOne({
      where: { id },
    });
    
 
    if (!item) {
      throw new Error('item not found');
    }
    

    return await this.imaeRepository.update(id, {
      status: 1,
    });
  }


}
