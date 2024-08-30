import { Module } from '@nestjs/common';
import { InformationService } from './information.service';
import { InformationController } from './information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformationEntity } from './entities/information.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([InformationEntity])],
  controllers: [InformationController],
  providers: [InformationService],
})
export class InformationModule {}
