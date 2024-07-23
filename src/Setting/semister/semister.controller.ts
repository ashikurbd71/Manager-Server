import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SemisterService } from './semister.service';
import { CreateSemisterDto } from './dto/create-semister.dto';
import { UpdateSemisterDto } from './dto/update-semister.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { SemisterEntity } from './entities/semister.entity';

@Controller('semister')
export class SemisterController {
  constructor(private readonly semisterService: SemisterService) {}

  @Post()
  create(@Body() createSemisterDto: CreateSemisterDto) {
    return this.semisterService.create(createSemisterDto);
  }

  @Get()
  findAll() {
    return this.semisterService.findAll();
  }

 
  @Get('search')
  async searchByQuery(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('query') query: string
  ): Promise<Pagination<SemisterEntity>> {
    const offset = (page - 1) * limit;
    return await this.semisterService.searchByQuery(
       offset ,
       limit, 
       query
      );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.semisterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSemisterDto: UpdateSemisterDto) {
    return this.semisterService.update(+id, updateSemisterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.semisterService.remove(+id);
  }

  @Patch('/enable/:id')
  async enable(@Param('id') id: string) {
    return await this.semisterService.enable(+id);
  }

  @Patch('/disable/:id')
  async disable(@Param('id') id: string) {
    return await this.semisterService.disable(+id);
  }


}
