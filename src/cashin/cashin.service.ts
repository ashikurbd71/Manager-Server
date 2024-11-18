import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCashinDto } from './dto/create-cashin.dto';
import { UpdateCashinDto } from './dto/update-cashin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CashinEntity } from './entities/cashin.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class CashinService {
  constructor(
    @InjectRepository(CashinEntity)
    private readonly cashinRepository: Repository<CashinEntity>,
  ) {}

  async create(createCashinDto: CreateCashinDto): Promise<CashinEntity> {
    const cashin = this.cashinRepository.create(createCashinDto);
    return await this.cashinRepository.save(cashin);
  }

  async findAll(): Promise<CashinEntity[]> {
    return await this.cashinRepository.find({
      relations: { studentName: { instituteName: true, department: true } },
    });
  }


  async searchByQuery(
    offset: number = 0,
    limit: number = 10,
    query: string,
  ): Promise<Pagination<CashinEntity>> {
    const queryBuilder = this.cashinRepository
      .createQueryBuilder('meal')
      .leftJoinAndSelect('meal.member', 'member');

    if (query) {
      queryBuilder.where('LOWER(member.name) LIKE :query', {
        query: `%${query.toLowerCase()}%`,
      });
    }

    queryBuilder.skip(offset).take(limit).orderBy('meal.member', 'DESC');

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
  


  async findOne(id: number): Promise<CashinEntity> {
    const cashin = await this.cashinRepository.findOne({
      where: { id },
      relations: { studentName: { instituteName: true, department: true } },
    });

    if (!cashin) {
      throw new NotFoundException(`Cashin with ID ${id} not found`);
    }

    return cashin;
  }

  async update(
    id: number,
    updateCashinDto: UpdateCashinDto,
  ): Promise<CashinEntity> {
    const cashin = await this.findOne(id); // Ensure the entity exists
    Object.assign(cashin, updateCashinDto);
    return await this.cashinRepository.save(cashin);
  }

  async remove(id: number): Promise<void> {
    const cashin = await this.findOne(id); // Ensure the entity exists
    await this.cashinRepository.remove(cashin);
  }
}
