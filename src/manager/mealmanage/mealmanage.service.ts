import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMealmanageDto } from './dto/create-mealmanage.dto';
import { UpdateMealmanageDto } from './dto/update-mealmanage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MealEntity } from './entities/mealmanage.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class MealmanageService {
  constructor(
    @InjectRepository(MealEntity)
    private readonly mealRepository: Repository<MealEntity>,
  ) {}

  async create(createMealmanageDto: Partial<MealEntity>) {
    const meal = this.mealRepository.create(createMealmanageDto);

    return await this.mealRepository.save(meal);
  }

  async findAll(): Promise<MealEntity[]> {
    return await this.mealRepository.find({
      relations: { member: { instituteName: true, department: true } },
    });
  }

  async searchByQuery(
    offset: number = 0,
    limit: number = 10,
    query: string,
  ): Promise<Pagination<MealEntity>> {
    const queryBuilder = this.mealRepository
      .createQueryBuilder('meal')
      .leftJoinAndSelect('meal.member', 'member');

    // .leftJoinAndSelect('meal.instituteName', 'instituteName')
    // .leftJoinAndSelect('meal.department', 'department')
    // .leftJoinAndSelect('meal.bloodGroup', 'bloodGroup')
    // .leftJoinAndSelect('meal.semister', 'semister');

    if (query) {
      queryBuilder.where('LOWER(member.name) LIKE :query', {
        query: `%${query.toLowerCase()}%`,
      });
    }

    queryBuilder.skip(offset).take(limit).orderBy('meal.member', 'DESC');

    console.log(query);

    const [items, total] = await queryBuilder.getManyAndCount();
    const statusOneCount = items.filter((item) => item.status === 1).length;
    console.log(items);

    return {
      items,
      meta: {
        itemCount: items.length,
        totalItems: total,
        itemsPerPage: limit,
        statusOneCount,
        totalPages: Math.ceil(total / limit),
        currentPage: Math.floor(offset / limit) + 1,
      },
    };
  }

  async findOne(id: number) {
    const meal = await this.mealRepository.findOne({
      where: { id },
      relations: {
        member: { instituteName: true, department: true, semister: true },
      },
    });

    if (!meal) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return meal;
  }

  async update(id: number, updateMealDto: UpdateMealmanageDto) {
    const existingManager = await this.mealRepository.findOne({
      where: { id },
    });

    if (!existingManager) {
      throw new NotFoundException('Item not found');
    }

    await this.mealRepository.merge(existingManager, updateMealDto);

    return await this.mealRepository.save(existingManager);
  }

  async remove(id: number): Promise<void> {
    const result = await this.mealRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  // disable

  async disable(id: number) {
    const item = await this.mealRepository.findOne({
      where: { id },
    });
    console.log(';ggggg', item);
    if (!item) {
      throw new Error('item not found');
    }

    return await this.mealRepository.update(id, {
      status: 0,
    });
  }

  // enable
  async enable(id: number) {
    const item = await this.mealRepository.findOne({
      where: { id },
    });

    if (!item) {
      throw new Error('item not found');
    }

    return await this.mealRepository.update(id, {
      status: 1,
    });
  }
}
