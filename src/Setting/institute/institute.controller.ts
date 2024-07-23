import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InstituteService } from './institute.service';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { InstituteEntity } from './entities/institute.entity';

@Controller('institute')
export class InstituteController {
  constructor(private readonly instituteService: InstituteService) {}

  // Create a new institute
  @Post()
  create(@Body() createInstituteDto: CreateInstituteDto) {
    console.log(createInstituteDto)
    return this.instituteService.create(createInstituteDto);
  }

  // Retrieve all institutes
  @Get()
  findAll() {
    return this.instituteService.findAll();
  }
  
  @Get('search')
  async searchByQuery(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('query') query: string
  ): Promise<Pagination<InstituteEntity>> {
    const offset = (page - 1) * limit;
    return await this.instituteService.searchByQuery(
       offset ,
       limit, 
       query
      );
  }
  
  // Retrieve a single institute by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instituteService.findOne(+id); // Convert string to number using `+id`
  }

  // Update an existing institute
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstituteDto: UpdateInstituteDto) {
    return this.instituteService.update(+id, updateInstituteDto); // Convert string to number using `+id`
  }

  // Remove an institute by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instituteService.remove(+id); // Convert string to number using `+id`
  }

  
  @Patch('/enable/:id')
  async enable(@Param('id') id: string) {
    return await this.instituteService.enable(+id);
  }

  @Patch('/disable/:id')
  async disable(@Param('id') id: string) {
    return await this.instituteService.disable(+id);
  }

}
  