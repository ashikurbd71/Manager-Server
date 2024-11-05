import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InformationEntity } from './entities/information.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InformationService {
  constructor(
    @InjectRepository(InformationEntity)
    private readonly informationRepository: Repository<InformationEntity>,
  ) {}

  // Create new information and save to the database
  async create(createInformationDto: CreateInformationDto): Promise<InformationEntity> {
    const newInfo = this.informationRepository.create(createInformationDto);
    return this.informationRepository.save(newInfo);
  }

  // Retrieve all information records
  async findAll(): Promise<InformationEntity[]> {
    return this.informationRepository.find();
  }

  // Find a single information record by ID
  async findOne(id: number): Promise<InformationEntity> {
    const info = await this.informationRepository.findOne({ where: { id } });
    if (!info) {
      throw new NotFoundException(`Info with ID ${id} not found`);
    }
    return info;
  }

  // Update an information record
  async update(id: number, updateInformationDto: UpdateInformationDto): Promise<InformationEntity> {
    const info = await this.informationRepository.preload({
      id,
      ...updateInformationDto,
    });

    if (!info) {
      throw new NotFoundException(`Info with ID ${id} not found`);
    }

    return this.informationRepository.save(info);
  }

  // Remove an information record by ID
  async remove(id: number): Promise<void> {
    const result = await this.informationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Info with ID ${id} not found`);
    }
  }
}
