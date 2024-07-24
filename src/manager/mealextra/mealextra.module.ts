import { Module } from '@nestjs/common';
import { MealextraService } from './mealextra.service';
import { MealextraController } from './mealextra.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealextraEntity } from './entities/mealextra.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([MealextraEntity])
  ],
  controllers: [MealextraController],
  providers: [MealextraService],
})
export class MealextraModule {}
