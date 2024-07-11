import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SemisterService } from './semister.service';
import { CreateSemisterDto } from './dto/create-semister.dto';
import { UpdateSemisterDto } from './dto/update-semister.dto';

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
  async search(@Query('query') query: string) {
    const results = await this.semisterService.searchByQuery(query);
    return results;
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


  @Patch('/enable')

  async enable(@Query('id') id: string) {
    return await this.semisterService.enable(+id);
  }

  @Patch('/disable')

  async disable(@Query('id') id: string) {
    return await this.semisterService.disable(+id);
}


}
