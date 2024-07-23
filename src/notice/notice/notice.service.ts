import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NoticeEntity } from './entities/notice.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class NoticeService {

  constructor(@InjectRepository(NoticeEntity) private readonly noticeRepository : Repository <NoticeEntity> ){
    
  }

  async create(createNoticeDto: CreateNoticeDto) : Promise <NoticeEntity> {

 const notice = this.noticeRepository.create(createNoticeDto)
 return await this.noticeRepository.save(notice)

  }

 async findAll() : Promise <NoticeEntity[]> {
    return this.noticeRepository.find()
  }

  async searchByQuery(
    
    offset: number = 0,
    limit: number = 10,
    query: string,
  ): Promise<Pagination<NoticeEntity>> {
    const queryBuilder = this.noticeRepository.createQueryBuilder('pref');
    
    if (query) {
      queryBuilder.where('LOWER(pref.noticetitle) LIKE :query', { query: `%${query.toLowerCase()}%` });
    }
    
    queryBuilder.skip(offset).take(limit).orderBy('pref.noticetitle', 'DESC');
  
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
  

  async findOne(id: number) : Promise <NoticeEntity> {

     const notice = await this.noticeRepository.findOne({where : {id}})

     if(!notice){
      throw new NotFoundException(`notice with ID ${id} not found`);
     }
    return notice
  }

  async update(id: number, updateNoticeDto: UpdateNoticeDto) : Promise <NoticeEntity> {

    const notice  = await this.noticeRepository.preload({
      id,
      ...updateNoticeDto
    })
   
    if(!notice){

      throw new NotFoundException(`notice with ID ${id} not found`); 
    }
    return await this.noticeRepository.save(notice)
  }

  async remove(id: number) :Promise<void> {
 const result = await this.noticeRepository.delete(id)
 if( result.affected === 0 ){
  throw new NotFoundException(`notice with ID ${id} not found`);

 }
  }

    // disable

    async disable(id: number) {
      const item = await this.noticeRepository.findOne({
        where: { id },
      });
      console.log(';ggggg',item)
      if (!item) {
        throw new Error('item not found');
      }
  
      return await this.noticeRepository.update(id, {
        status: 0,
      });
    }

    // enable
  async enable(id: number) {
    const item = await this.noticeRepository.findOne({
      where: { id },
    });
    
 
    if (!item) {
      throw new Error('item not found');
    }
    

    return await this.noticeRepository.update(id, {
      status: 1,
    });
  }

}
