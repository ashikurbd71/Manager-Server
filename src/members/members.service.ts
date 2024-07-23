import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity } from './entities/member.entity';
import { Pagination } from 'nestjs-typeorm-paginate';


@Injectable()
export class MembersService {
  instituteRepository: any;

  // inject repo

  constructor(@InjectRepository(MemberEntity) private readonly memberRepository : Repository <MemberEntity> ){}

  async create(createMemberDto: Partial <MemberEntity>) {

    const Member = this.memberRepository.create(createMemberDto);
    return await this.memberRepository.save(Member)
  }

  async findAll() : Promise <MemberEntity []> {

    return await this.memberRepository.find({

      relations: [
        'instituteName',
        'department',
        'bloodGroup',
        'semister',
       
      ],
    });

  }

  async searchByQuery(
    
    offset: number = 0,
    limit: number = 10,
    query: string,
  ): Promise<Pagination<MemberEntity>> {
    const queryBuilder = this.memberRepository.createQueryBuilder('member')
    .leftJoinAndSelect('member.instituteName', 'instituteName')
    .leftJoinAndSelect('member.department', 'department')
    .leftJoinAndSelect('member.bloodGroup', 'bloodGroup')
    .leftJoinAndSelect('member.semister', 'semister');
    
    if (query) {
      queryBuilder.where('LOWER(member.name) LIKE :query', { query: `%${query.toLowerCase()}%` });
    }
    
    queryBuilder.skip(offset).take(limit).orderBy('member.name', 'DESC');
  
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
    
    const member = await this.memberRepository.findOne({where : {id}
    ,
    relations: [
      'instituteName',
      'department',
      'bloodGroup',
      'semister',
     
    ],
    })

    if(!member){
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return member;
  }



  async update(id: number, UpdateMemberDto: UpdateMemberDto) {
    const existingMember = await this.memberRepository.findOne({
      where: { id },
    });

    if (!existingMember) {
      throw new NotFoundException('Item not found');
    }

    await this.memberRepository.merge(
      existingMember,
      UpdateMemberDto,
    );

    return await this.memberRepository.save(existingMember);
  }


  async remove(id: number) : Promise< void> {
    const result = await this.memberRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }


    // disable

   async disable(id: number) {
    const item = await this.memberRepository.findOne({
      where: { id },
    });
    console.log(';ggggg',item)
    if (!item) {
      throw new Error('item not found');
    }

    return await this.memberRepository.update(id, {
      status: 0,
    });
  }

  
  // enable
  async enable(id: number) {
    const item = await this.memberRepository.findOne({
      where: { id },
    });
    
 
    if (!item) {
      throw new Error('item not found');
    }
    

    return await this.memberRepository.update(id, {
      status: 1,
    });
  }
  
}
