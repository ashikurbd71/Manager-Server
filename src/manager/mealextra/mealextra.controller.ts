import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MealextraService } from './mealextra.service';
import { CreateMealextraDto } from './dto/create-mealextra.dto';
import { UpdateMealextraDto } from './dto/update-mealextra.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { MealextraEntity } from './entities/mealextra.entity';

@Controller('mealextra')
export class MealextraController {
  constructor(private readonly mealextraService: MealextraService) {}

  @Post()
  create(@Body() createMealextraDto: CreateMealextraDto) {
    return this.mealextraService.create(createMealextraDto);
  }

  @Get()
  findAll() {
    return this.mealextraService.findAll() ;
  }

  @Get('search')
  async searchByQuery(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('query') query: string
  ): Promise<Pagination<MealextraEntity>> {
    const offset = (page - 1) * limit;
    return await this.mealextraService.searchByQuery(
       offset ,
       limit, 
       query
      );
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealextraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMealextraDto: UpdateMealextraDto) {
    return this.mealextraService.update(+id, updateMealextraDto);
  }


  
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.mealextraService.remove(+id);
  }


}
