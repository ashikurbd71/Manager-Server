import { Module } from '@nestjs/common';
import { SemisterService } from './semister.service';
import { SemisterController } from './semister.controller';
import { SemisterEntity } from './entities/semister.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([SemisterEntity])
  ],
  controllers: [SemisterController],
  providers: [SemisterService],
})
export class SemisterModule {}
