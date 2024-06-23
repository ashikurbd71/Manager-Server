import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InstituteEntity } from './entities/institute.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InstituteService {
  constructor(
    @InjectRepository(InstituteEntity)
    private readonly instituteRepository: Repository<InstituteEntity>,
  ) {}

  // Create a new institute
  async create(createInstituteDto: CreateInstituteDto): Promise<InstituteEntity> {
    // Create a new institute instance using the DTO
    const institute = this.instituteRepository.create(createInstituteDto);
    // Save the new institute to the database
    return await this.instituteRepository.save(institute);
  }

  // Retrieve all institutes
  async findAll(): Promise<InstituteEntity[]> {
    return await this.instituteRepository.find();
  }

  // Retrieve a single institute by ID
  async findOne(id: number): Promise<InstituteEntity> {
    const institute = await this.instituteRepository.findOne({ where: { id } });
    if (!institute) {
      throw new NotFoundException(`Institute with ID ${id} not found`);
    }
    return institute;
  }

  // Update an existing institute
  async update(id: number, updateInstituteDto: UpdateInstituteDto): Promise<InstituteEntity> {
    // Attempt to preload the institute with the given ID and updated data
    const institute = await this.instituteRepository.preload({
      id,
      ...updateInstituteDto,
    });
    // If no institute is found, throw a NotFoundException
    if (!institute) {
      throw new NotFoundException(`Institute with ID ${id} not found`);
    }
    // Save the updated institute entity and return the result
    return await this.instituteRepository.save(institute);
  }

  // Remove an institute by ID
  async remove(id: number): Promise<void> {
    const result = await this.instituteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Institute with ID ${id} not found`);
    }
  }
}
