import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from './entities/report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {

  constructor(@InjectRepository(ReportEntity) private readonly reportRepository: Repository <ReportEntity>) {}

 async create(createReportDto: Partial <ReportEntity>) {

   const report =  this.reportRepository.create(createReportDto)
    return  await this.reportRepository.save(report)
  }

  async findAll() : Promise <ReportEntity []> {

    return  await this.reportRepository.find({

      relations: { bazarKari: { instituteName: true, department: true } },
    })
   
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
