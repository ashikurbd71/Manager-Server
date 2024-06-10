import { Module } from '@nestjs/common';
import { BloodService } from './blood.service';
import { BloodController } from './blood.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloodEntity } from './entities/blood.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BloodEntity])
  ],
  controllers: [BloodController],
  providers: [BloodService],
})
export class BloodModule {}
