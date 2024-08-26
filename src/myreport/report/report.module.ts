import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { ReportEntity } from './entities/report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from 'src/members/entities/member.entity';

@Module({
  imports : [ TypeOrmModule.forFeature([ReportEntity,MemberEntity])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
