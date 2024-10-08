import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InformationEntity } from './entities/information.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InformationService {

  constructor( @InjectRepository(InformationEntity) private readonly informationRepository : Repository <InformationEntity>) { }


// information.service.ts

async create(createInformationDto: CreateInformationDto): Promise<InformationEntity> {
  console.log('Creating information with data:', createInformationDto);
  return this.informationRepository.create(createInformationDto);
}


async findAll(): Promise<InformationEntity[]> {
  return this.informationRepository.find({
    order: {
      name: 'ASC', // Sort by name in ascending order
    },
  });
}


  
  async findOne(id: number) {
    const info = this.informationRepository.findOne({where : {id}})

    if(!info){

      throw new NotFoundException(`info with ID ${id} not found`)
    }
  }

  async update(id: number, updateBloodDto: CreateInformationDto) : Promise <InformationEntity> {
    const blood = await this.informationRepository.preload({

      id,
  ...updateBloodDto
    })

    if(!blood){

      throw new NotFoundException(`Blood with ID ${id} not found`)
    }

    return this.informationRepository.save(blood)
  }

  async remove(id: number) : Promise <void> {
   const result =  await this.informationRepository.delete(id)
   if(result .affected === 0){

    throw new NotFoundException(`Blood with ID ${id} not found`)
  }
   }
}
