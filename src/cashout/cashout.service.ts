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
      relations: { managerName: { instituteName: true, department: true } },
    });
  }

  async searchByQuery(
    offset: number = 0,
    limit: number = 10,
    query: string,
  ): Promise<Pagination<CashoutEntity>> {
    const queryBuilder = this.cashoutRepository
      .createQueryBuilder('cashout')
      .leftJoinAndSelect('cashout.member', 'member');

    if (query) {
      queryBuilder.where('LOWER(member.name) LIKE :query', {
        query: `%${query.toLowerCase()}%`,
      });
    }

    queryBuilder.orderBy('cashout.createdAt', 'DESC'); // Adjust column as needed

    return paginate<CashoutEntity>(queryBuilder, { page: offset / limit + 1, limit });
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
      relations: { managerName: { instituteName: true, department: true } },
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
