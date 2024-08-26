import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BazalistService } from './bazalist.service';
import { CreateBazalistDto } from './dto/create-bazalist.dto';
import { UpdateBazalistDto } from './dto/update-bazalist.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { BazalistEntity } from './entities/bazalist.entity';

@Controller('bazalist')
export class BazalistController {
  constructor(private readonly bazalistService: BazalistService) {}

  @Post()
  create(@Body() createBazalistDto: CreateBazalistDto) {
    return this.bazalistService.create(createBazalistDto);
  }

  @Get()
  findAll() {
    return this.bazalistService.findAll();
  }

  
  @Get('search')
  async searchByQuery(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('query') query: string
  ): Promise<Pagination<BazalistEntity>> {
    const offset = (page - 1) * limit;
    return await this.bazalistService.searchByQuery(
       offset ,
       limit, 
       query
      );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bazalistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBazalistDto: UpdateBazalistDto) {
    return this.bazalistService.update(+id, updateBazalistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bazalistService.remove(+id);
  }
}
