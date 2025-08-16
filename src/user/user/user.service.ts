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
  ) { }

  async create(createUserDto: Partial<UserEntity>) {
    const isExist = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (isExist) {
      throw new BadRequestException('User Already Exists');
    }

    // Generate salt
    const salt = await bcrypt.genSalt(12);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);


    // Set the hashed password in createUserDto
    createUserDto.password = hashedPassword;

    // Create a new user entity with the full createUserDto object
    const user = this.userRepository.create(createUserDto);

    // Save the user
    return await this.userRepository.save(user);
  }

  async updatePassword(userId: number, newPassword: string): Promise<UserEntity> {
    // Find the user by id
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    // If the user is not found, throw an exception
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generate salt and hash the new password
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(newPassword, salt);

    // Save the updated user with the new password
    return await this.userRepository.save(user);
  }


  async findAll() {
    return await this.userRepository.find({
      relations: {
        userName: {
          instituteName: true,
          department: true,
          semister: true,
          bloodGroup: true,
        },
      },
    });
  }
  async searchByQuery(
    offset: number = 0,
    limit: number = 10,
    query: string,
  ): Promise<Pagination<UserEntity>> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userName', 'userName')
      .leftJoinAndSelect('user.manager', 'manager');

    // Filter by userName
    if (query) {
      queryBuilder.where('LOWER(userName.name) LIKE :query', {
        query: `%${query.toLowerCase()}%`,
      });
    }

    // // Optionally, filter by manager (e.g., if you want to filter users by manager's name)
    // // Uncomment and adjust the condition if needed
    // if (managerQuery) {
    //   queryBuilder.andWhere('LOWER(manager.name) LIKE :managerQuery', {
    //     managerQuery: `%${managerQuery.toLowerCase()}%`,
    //   });
    // }aut



    // Order by userName and optionally by manager
    queryBuilder.orderBy('userName.name', 'DESC')
      .addOrderBy('manager.name', 'ASC'); // Adjust based on the actual field in manager

    queryBuilder.skip(offset).take(limit);

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

      relations: {
        userName: {
          instituteName: true,
          department: true,
          semister: true,
          bloodGroup: true,
        },
        manager: {
          instituteName: true,
          department: true,
          semister: true,


        }
      },
    });
  }

  async findOneEmail(email: string): Promise<UserEntity> {
    try {
      return await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .getOne();
    } catch (error) {
      throw new Error(`Error finding user by email: ${error.message}`);
    }
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


  // disable

  async disable(id: number) {
    const item = await this.userRepository.findOne({
      where: { id },
    });
    console.log(';ggggg', item)
    if (!item) {
      throw new Error('item not found');
    }

    return await this.userRepository.update(id, {
      status: 0,
    });
  }


  // enable
  async enable(id: number) {
    const item = await this.userRepository.findOne({
      where: { id },
    });


    if (!item) {
      throw new Error('item not found');
    }


    return await this.userRepository.update(id, {
      status: 1,
    });
  }
}
