import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { RoomEntity } from './entities/room.entity';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async createRoom(@Body() roomData: Partial<RoomEntity>): Promise<RoomEntity> {
      return this.roomService.createRoom(roomData);
  }

  @Get()
  async findAll(): Promise<RoomEntity[]> {
    return await this.roomService.findAll();
  }

  @Get('/search')
  async search(
    @Query('offset') offset: number = 0,
    @Query('limit') limit: number = 10,
    @Query('query') query: string,
  ): Promise<Pagination<RoomEntity>> {
    return await this.roomService.searchByQuery(offset, limit, query);
  }

  @Get('totals')
  async getTotals() {
    return await this.roomService.getTotalSeatsAndCount();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<RoomEntity> {
    return await this.roomService.findOne(id);
  }

  @Patch(":id")
    async updateRoom(
        @Param("id") id: number,
        @Body() roomUpdateDto: UpdateRoomDto,
    ): Promise<RoomEntity> {
        return this.roomService.updateRoom(id, roomUpdateDto);
    }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.roomService.remove(id);
  }
}
