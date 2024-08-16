import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const isExist = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (isExist) {
      throw new Error('User Already Exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(CreateUserDto.password, 12);

    // Create the user entity
    const user = this.userRepository.create({
      email: createUserDto.email,
      role : createUserDto.role,
      password: hashedPassword,
    });

    // Save the user
    return await this.userRepository.save(user);
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    
    if (updateUserDto.password) {
      user.password = await bcrypt.hash(updateUserDto.password, 12);
    }

    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find({
      relations: { userName: { instituteName: true, department: true ,semister:true,bloodGroup:true} },
    });
  }

  async searchByQuery(
    offset: number = 0,
    limit: number = 10,
    query: string,
  ): Promise<Pagination<UserEntity>> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userName', 'userName');

    // .leftJoinAndSelect('meal.instituteName', 'instituteName')
    // .leftJoinAndSelect('meal.department', 'department')
    // .leftJoinAndSelect('meal.bloodGroup', 'bloodGroup')
    // .leftJoinAndSelect('meal.semister', 'semister');

    if (query) {
      queryBuilder.where('LOWER(userName.name) LIKE :query', {
        query: `%${query.toLowerCase()}%`,
      });
    }

    queryBuilder.skip(offset).take(limit).orderBy('user.userName', 'DESC');

    console.log(query);

    const [items, total] = await queryBuilder.getManyAndCount();


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
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findOneEmail(email: string): Promise<UserEntity> {
    return await this.userRepository
      .createQueryBuilder('user')   
      .where('user.email = :email', { email })
      .getOne();
  }

  async delete(id: number): Promise<void> {
    const existingUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(existingUser);
  }
}
