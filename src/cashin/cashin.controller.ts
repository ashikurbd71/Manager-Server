import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  HttpException, 
  HttpStatus, 
  Query
} from '@nestjs/common';

import { UpdateCashinDto } from './dto/update-cashin.dto';
import { CreateCashinDto } from './dto/create-cashin.dto';
import { CashinService } from './cashin.service';
import { CashinEntity } from './entities/cashin.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('cashin')
export class CashinController {
  constructor(private readonly cashinService: CashinService) {}

  @Post()
  async create(@Body() createCashinDto: CreateCashinDto): Promise<CashinEntity> {
    try {
      return await this.cashinService.create(createCashinDto);
    } catch (error) {
      console.error('Error creating cashin:', error);
      throw new HttpException(
        { message: 'Failed to create cashin' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<{ message: string; cashin: CashinEntity[] }> {
    try {
      const cashin = await this.cashinService.findAll();
      return { message: 'Successfully retrieved all cash-ins', cashin };
    } catch (error) {
      console.error('Error retrieving cash-ins:', error);
      throw new HttpException(
        { message: 'An unexpected error occurred while fetching cash-ins' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  
  @Get('search')
  async searchByQuery(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('query') query: string
  ): Promise<Pagination<CashinEntity>> {
    const offset = (page - 1) * limit;
    return await this.cashinService.searchByQuery(
       offset ,
       limit, 
       query
      );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CashinEntity> {
    try {
      return await this.cashinService.findOne(+id);
    } catch (error) {
      console.error(`Error retrieving cashin with ID ${id}:`, error);
      throw new HttpException(
        { message: `Failed to retrieve cashin with ID ${id}` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('total')
  async calculateTotal() {
    const totalAmount = await this.cashinService.calculateTotalAmount();
    return { totalAmount };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCashinDto: UpdateCashinDto,
  ): Promise<CashinEntity> {
    try {
      return await this.cashinService.update(+id, updateCashinDto);
    } catch (error) {
      console.error(`Error updating cashin with ID ${id}:`, error);
      throw new HttpException(
        { message: `Failed to update cashin with ID ${id}` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.cashinService.remove(+id);
      return { message: `Cashin with ID ${id} successfully deleted` };
    } catch (error) {
      console.error(`Error deleting cashin with ID ${id}:`, error);
      throw new HttpException(
        { message: `Failed to delete cashin with ID ${id}` },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
