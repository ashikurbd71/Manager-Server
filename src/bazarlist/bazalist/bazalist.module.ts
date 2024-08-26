import { Module } from '@nestjs/common';
import { BazalistService } from './bazalist.service';
import { BazalistController } from './bazalist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BazalistEntity } from './entities/bazalist.entity';

@Module({
  imports : [ TypeOrmModule.forFeature([BazalistEntity])],
  controllers: [BazalistController],
  providers: [BazalistService],
})
export class BazalistModule {}
