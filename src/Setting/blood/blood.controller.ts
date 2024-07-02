import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { BloodService } from './blood.service';
import { CreateBloodDto } from './dto/create-blood.dto';
import { UpdateBloodDto } from './dto/update-blood.dto';
import { BloodEntity } from './entities/blood.entity';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bloodService.findOne(+id);
  }

  @Get('search')
  async search(@Query('query') query: string) {
    const results = await this.bloodService.searchByQuery(query);
    return results;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBloodDto: UpdateBloodDto) {
    return this.bloodService.update(+id, updateBloodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bloodService.remove(+id);
  }

  @Patch('/enable')

  async enable(@Query('id') id: string) {
    return await this.bloodService.enable(+id);
  }

  @Patch('/disable')

  async disable(@Query('id') id: string) {
    return await this.bloodService.disable(+id);
}
}
