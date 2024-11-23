import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

import { CashoutEntity } from './entities/cashout.entity';
import { CreateCashoutDto } from './dto/create-cashout.dto';
import { UpdateCashoutDto } from './dto/update-cashout.dto';

@Injectable()
export class CashoutService {
  constructor(
    @InjectRepository(CashoutEntity)
    private readonly cashoutRepository: Repository<CashoutEntity>,
  ) {}

  async create(createCashoutDto: CreateCashoutDto): Promise<CashoutEntity> {
    const cashout = this.cashoutRepository.create(createCashoutDto);
    return await this.cashoutRepository.save(cashout);
  }

  async findAll(): Promise<CashoutEntity[]> {
    return await this.cashoutRepository.find({
  
    });
  }


  async searchByQuery(
    offset: number = 0,
    limit: number = 10,
    query: string,
  ): Promise<Pagination<CashoutEntity>> {
    const queryBuilder = this.cashoutRepository.createQueryBuilder('pref');
    
    if (query) {
      queryBuilder.where('LOWER(pref.name) LIKE :query', { query: `%${query.toLowerCase()}%` });
    }
    if (query) {
      queryBuilder.where('LOWER(pref.code) LIKE :query', { query: `%${query.toLowerCase()}%` });
    }
    
    queryBuilder.skip(offset).take(limit).orderBy('pref.name', 'DESC');
    queryBuilder.skip(offset).take(limit).orderBy('pref.code', 'DESC');
  
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


  async calculateTotalAmount(): Promise<number> {
    const result = await this.cashoutRepository
      .createQueryBuilder('cashout')
      .select('SUM(cashout.amount)', 'total')
      .getRawOne();
  
    return result.total ? Number(result.total) : 0;
  }

  async findOne(id: number): Promise<CashoutEntity> {
    const cashout = await this.cashoutRepository.findOne({
      where: { id },

    });

    if (!cashout) {
      throw new NotFoundException(`Cashout with ID ${id} not found`);
    }

    return cashout;
  }

  async update(
    id: number,
    updateCashoutDto: UpdateCashoutDto,
  ): Promise<CashoutEntity> {
    const cashout = await this.findOne(id); // Ensure the entity exists
    Object.assign(cashout, updateCashoutDto);
    return await this.cashoutRepository.save(cashout);
  }

  async remove(id: number): Promise<void> {
    const cashout = await this.findOne(id); // Ensure the entity exists
    await this.cashoutRepository.remove(cashout);
  }
}
