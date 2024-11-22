import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { RoomEntity } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  async createRoom(data: Partial<RoomEntity>): Promise<RoomEntity> {
    const room = this.roomRepository.create(data);

    // Calculate count manually
    room.count = (room.studentOne ? 1 : 0) + (room.studentTwo ? 1 : 0);

    return this.roomRepository.save(room);
}


  async findAll(): Promise<RoomEntity[]> {
    return await this.roomRepository.find({
      relations: {
        studentOne: { instituteName: true, department: true, semister: true },
        studentTwo: { instituteName: true, department: true, semister: true },
      },
    });
  }

  async searchByQuery(
    offset: number = 0,
    limit: number = 10,
    query: string,
  ): Promise<Pagination<RoomEntity>> {
    const queryBuilder = this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.studentOne', 'studentOne')
      .leftJoinAndSelect('room.studentTwo', 'studentTwo');

    if (query) {
      queryBuilder.where('LOWER(room.name) LIKE :query', {
        query: `%${query.toLowerCase()}%`,
      });
    }

    queryBuilder.orderBy('room.createdAt', 'DESC');

    return paginate<RoomEntity>(queryBuilder, { page: offset / limit + 1, limit });
  }

  async findOne(id: number): Promise<RoomEntity> {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: {
        studentOne: { instituteName: true, department: true, semister: true },
        studentTwo: { instituteName: true, department: true, semister: true },
      },
    });

    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }

    return room;
  }


  async getTotalSeatsAndCount(): Promise<{ totalSeats: number; totalCount: number }> {
    const result = await this.roomRepository
      .createQueryBuilder('room')
      .select('SUM(room.seat)', 'totalSeats')
      .addSelect('SUM(room.count)', 'totalCount')
      .getRawOne();

    return {
      totalSeats: result.totalSeats ? Number(result.totalSeats) : 0,
      totalCount: result.totalCount ? Number(result.totalCount) : 0,
    };
  }


  async updateRoom(id: number, data: UpdateRoomDto): Promise<RoomEntity> {
    // Find the room to update
    const room = await this.roomRepository.findOne({ where: { id }, relations: ["studentOne", "studentTwo"] });

    if (!room) {
        throw new NotFoundException("Room not found");
    }

    // Update the room fields
    Object.assign(room, data);

    // Calculate the count manually
    room.count = (room.studentOne ? 1 : 0) + (room.studentTwo ? 1 : 0);

    // Save the updated room
    return this.roomRepository.save(room);
}

  async remove(id: number): Promise<void> {
    const room = await this.findOne(id);
    await this.roomRepository.remove(room);
  }
}
