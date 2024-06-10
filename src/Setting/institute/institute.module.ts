import { Module } from '@nestjs/common';
import { InstituteService } from './institute.service';
import { InstituteController } from './institute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstituteEntity } from './entities/institute.entity';

@Module({

  imports:[
    TypeOrmModule.forFeature([InstituteEntity])
  ],
  controllers: [InstituteController],
  providers: [InstituteService],
})
export class InstituteModule {}
