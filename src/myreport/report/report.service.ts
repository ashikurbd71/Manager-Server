import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from './entities/report.entity';
import { Repository } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class ReportService {

  constructor(@InjectRepository(ReportEntity) private readonly reportRepository: Repository <ReportEntity>) {}

 async create(createReportDto: Partial <ReportEntity>) {

   const report =  this.reportRepository.create(createReportDto)
    return  await this.reportRepository.save(report)
  }





  async findAll() : Promise <ReportEntity []> {

    return  await this.reportRepository.find({

      relations:  ["bazarKari1","bazarKari2"],
    })
   
  }

  async searchByQuery(
    offset: number = 0,
    limit: number = 10,
    query: string,
  ): Promise<Pagination<ReportEntity>> {
    const queryBuilder = this.reportRepository
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.bazarKari1', 'bazarKari1')
      .leftJoinAndSelect('report.bazarKari2', 'bazarKari2');

   if (query) {
      queryBuilder.where('LOWER(bazarKari1.name) LIKE :query', {
        query: `%${query.toLowerCase()}%`,
      });
    }

    queryBuilder.skip(offset).take(limit).orderBy('report.bazarKari1', 'DESC');

    console.log(query);

    const [items, total] = await queryBuilder.getManyAndCount();
  
    console.log(items);

    return {
      items,
      meta: {
        itemCount: items.length,
        totalItems: total,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: Math.floor(offset / limit) + 1,
      },
    };
  }

  
  async getApprovedTotals() {
    const approvedReports = await this.reportRepository.find({
      where: { reportStatus: 'Approved' },
    });
  
    const totalTk = approvedReports.reduce((sum, report) => sum + parseFloat(report.totalTk), 0);
    const totalMeal = approvedReports.reduce((sum, report) => sum + parseFloat(report.totalMeal), 0);
    const extraTk = approvedReports.reduce((sum, report) => sum + parseFloat(report.extraTk), 0);
  
    return {
      totalTk,
      totalMeal,
      extraTk,
    };
  }

 async findOne(id: number) {

    const report = this.reportRepository.findOne({where : {id},
      relations:  ["bazarKari1","bazarKari2"]
    
    })
    if (!report) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return report;
  }



  async update(id: number, updateReportDto: UpdateReportDto) {

    const reports = await this.reportRepository.findOne({where : {id}})
    if (!reports) {
      throw new NotFoundException('Item not found');
    }
    await this.reportRepository.merge(
      reports,
      updateReportDto,
    );

    return await this.reportRepository.save(reports);
  }

  
 async remove(id: number) : Promise< void> {
    const result = await this.reportRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }


  
    // disable

    async disable(id: number) {
      const item = await this.reportRepository.findOne({
        where: { id },
      });
      console.log('ggggg',item)
      if (!item) {
        throw new Error('item not found');
      }
  
      return await this.reportRepository.update(id, {
        status: 0,
      });
    }
  
    
    // enable
    async enable(id: number) {
      const item = await this.reportRepository.findOne({
        where: { id },
      });
      
   
      if (!item) {
        throw new Error('item not found');
      }
      
  
      return await this.reportRepository.update(id, {
        status: 1,
      });
    }
}
