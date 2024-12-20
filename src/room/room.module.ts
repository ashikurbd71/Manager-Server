import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomEntity]), // Register the entity here
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
