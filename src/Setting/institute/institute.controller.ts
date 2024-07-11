import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InstituteService } from './institute.service';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';

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
  async search(@Query('query') query: string) {
    const results = await this.instituteService.searchByQuery(query);
    return results;
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

  @Patch('/enable')

  async enable(@Query('id') id: string) {
    return await this.instituteService.enable(+id);
  }

  @Patch('/disable')

  async disable(@Query('id') id: string) {
    return await this.instituteService.disable(+id);
}

}
  