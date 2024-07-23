import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { BloodService } from './blood.service';
import { CreateBloodDto } from './dto/create-blood.dto';
import { UpdateBloodDto } from './dto/update-blood.dto';
import { BloodEntity } from './entities/blood.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('blood')
export class BloodController {
  constructor(private readonly bloodService: BloodService) {}

  @Post()
  create(@Body() createBloodDto: CreateBloodDto) {
    return this.bloodService.create(createBloodDto);
  }

  @Get()
  findAll() {
    return this.bloodService.findAll();
  }

  @Get('search')
  async searchByQuery(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('query') query: string
  ): Promise<Pagination<BloodEntity>> {
    const offset = (page - 1) * limit;
    return await this.bloodService.searchByQuery(
       offset ,
       limit, 
       query
      );
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bloodService.findOne(+id);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBloodDto: UpdateBloodDto) {
    return this.bloodService.update(+id, updateBloodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bloodService.remove(+id);
  }
  @Patch('/enable/:id')
  async enable(@Param('id') id: string) {
    return await this.bloodService.enable(+id);
  }

  @Patch('/disable/:id')
  async disable(@Param('id') id: string) {
    return await this.bloodService.disable(+id);
  }
}
