import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity } from './entities/member.entity';


@Injectable()
export class MembersService {

  // inject repo

  constructor(@InjectRepository(MemberEntity) private readonly memberRepository : Repository <MemberEntity> ){


  }

  async create(createMemberDto: CreateMemberDto) : Promise <MemberEntity> {

    const Member = this.memberRepository.create(createMemberDto);
    return await this.memberRepository.save(Member)
  }

  async findAll() : Promise <MemberEntity []> {

    return await this.memberRepository.find();

  }

  async searchByQuery(query: string): Promise<MemberEntity[]> {
    const queryBuilder = this.memberRepository.createQueryBuilder('pref');
  
    
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
    
    const member = await this.memberRepository.findOne({where : {id}})

    if(!member){
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return member;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise <MemberEntity> {
    const member = await this.memberRepository.preload({
      id,
      ...updateMemberDto,
    });

    if (!member) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return await this.memberRepository.save(member);
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
