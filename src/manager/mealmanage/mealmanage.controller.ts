import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { MealmanageService } from './mealmanage.service';
import { CreateMealmanageDto } from './dto/create-mealmanage.dto';
import { UpdateMealmanageDto } from './dto/update-mealmanage.dto';
import { MealEntity } from './entities/mealmanage.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('mealmanage')
export class MealmanageController {
  constructor(private readonly mealmanageService: MealmanageService) {}

  @Post()
  create(@Body() createMealmanageDto: CreateMealmanageDto) {
    return this.mealmanageService.create(createMealmanageDto);
  }

 
  @Get() 
  async findAll() : Promise <{message : string; meal: MealEntity[]}> {
    try {
      const meal = await this.mealmanageService.findAll();
      return { message: 'Successfully retrieved all meals', meal };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'An unexpected error occurred.' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('search')
  async searchByQuery(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('query') query: string
  ): Promise<Pagination<MealEntity>> {
    const offset = (page - 1) * limit;
    return await this.mealmanageService.searchByQuery(
       offset ,
       limit, 
       query
      );
  }

  @Get('total-add-money')
  async getTotalAddMoney() {
    // Call the service method
    const result = await this.mealmanageService.getTotalAddMoney();

    // Return the result from the service
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.mealmanageService.findOne(+id);
  }

 
  @Patch(':id')

  update(
    @Param('id') id: string,
    @Body() UpdatemealDto: UpdateMealmanageDto,) {

    return this.mealmanageService.update(+id, UpdatemealDto);}

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.mealmanageService.remove(+id);
  }

  @Patch('/enable/:id')
  async enable(@Param('id') id: string) {
    return await this.mealmanageService.enable(+id);
  }

  @Patch('/disable/:id')
  async disable(@Param('id') id: string) {
    return await this.mealmanageService.disable(+id);
  }
}
