import { Module } from '@nestjs/common';
import { MealmanageService } from './mealmanage.service';
import { MealmanageController } from './mealmanage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealEntity } from './entities/mealmanage.entity';

@Module({
  imports : [ TypeOrmModule.forFeature([MealEntity])],
  controllers: [MealmanageController],
  providers: [MealmanageService],
})
export class MealmanageModule {}
