import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ReportEntity } from './entities/report.entity';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Post()
  @UseInterceptors(FileInterceptor('profile', {
    storage: diskStorage({
      destination: '../uploads', // Set the destination for uploaded files
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // Generate a unique filename
        const ext = extname(file.originalname); // Get the file extension
        callback(null, `${uniqueSuffix}${ext}`); // Create the unique filename
      },
    }),
  }))
  async postAdd(@UploadedFile() profile: Express.Multer.File, @Body() createReportDto: CreateReportDto): Promise<object> {
    if (profile) {
      createReportDto.profile = `uploads/${profile.filename}`; // Save the file path to the DTO
    }
    await this.reportService.create(createReportDto); // Create the member with the data in createReportDto
    return {
      message: 'File uploaded and member created successfully',
      profile: createReportDto.profile, // Return the profile URL
    };
  }

  @Get()
  findAll() {
    return this.reportService.findAll();
  }

  
  @Get('search')
  async searchByQuery(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('query') query: string
  ): Promise<Pagination<ReportEntity>> {
    const offset = (page - 1) * limit;
    return await this.reportService.searchByQuery(
       offset ,
       limit, 
       query
      );
  }

  @Get('approved-totals')
  async getApprovedTotals() {
    return await this.reportService.getApprovedTotals();
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reportService.findOne(+id);
  }

 

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('/uploads'),
  )
  update(
    @Param('id') id: string,
    @Body() createReportDto: CreateReportDto,
    @UploadedFile() profile?: Express.Multer.File,
  ) {
    if (profile) {
      const fileName = `${profile.filename}`;
      createReportDto.profile = `/uploads${fileName}`;
    }

    return this.reportService.update(+id, createReportDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reportService.remove(+id);
  }

  @Patch('/enable/:id')
  async enable(@Param('id') id: string) {
    return await this.reportService.enable(+id);
  }

  @Patch('/disable/:id')
  async disable(@Param('id') id: string) {
    return await this.reportService.disable(+id);
  }
}
