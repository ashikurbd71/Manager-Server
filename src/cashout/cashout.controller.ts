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

import { Pagination } from 'nestjs-typeorm-paginate';
import { CashoutService } from './cashout.service';
import { CreateCashoutDto } from './dto/create-cashout.dto';
import { CashoutEntity } from './entities/cashout.entity';
import { UpdateCashoutDto } from './dto/update-cashout.dto';

@Controller('cashout')
export class CashoutController {
  constructor(private readonly cashoutService: CashoutService) {}

  @Post()
  async create(@Body() createCashoutDto: CreateCashoutDto): Promise<CashoutEntity> {
    try {
      return await this.cashoutService.create(createCashoutDto);
    } catch (error) {
      console.error('Error creating cashout:', error);
      throw new HttpException(
        { message: 'Failed to create cashout' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<{ message: string; cashout: CashoutEntity[] }> {
    try {
      const cashout = await this.cashoutService.findAll();
      return { message: 'Successfully retrieved all cash-outs', cashout };
    } catch (error) {
      console.error('Error retrieving cash-outs:', error);
      throw new HttpException(
        { message: 'An unexpected error occurred while fetching cash-outs' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('search')
  async searchByQuery(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('query') query: string,
  ): Promise<Pagination<CashoutEntity>> {
    try {
      const offset = (page - 1) * limit;
      return await this.cashoutService.searchByQuery(offset, limit, query);
    } catch (error) {
      console.error('Error searching cash-outs:', error);
      throw new HttpException(
        { message: 'An error occurred while searching cash-outs' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  @Get('total')
  async calculateTotal() {
    const totalAmount = await this.cashoutService.calculateTotalAmount();
    return { totalAmount };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CashoutEntity> {
    try {
      return await this.cashoutService.findOne(+id);
    } catch (error) {
      console.error(`Error retrieving cashout with ID ${id}:`, error);
      throw new HttpException(
        { message: `Failed to retrieve cashout with ID ${id}` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCashoutDto: UpdateCashoutDto,
  ): Promise<CashoutEntity> {
    try {
      return await this.cashoutService.update(+id, updateCashoutDto);
    } catch (error) {
      console.error(`Error updating cashout with ID ${id}:`, error);
      throw new HttpException(
        { message: `Failed to update cashout with ID ${id}` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.cashoutService.remove(+id);
      return { message: `Cashout with ID ${id} successfully deleted` };
    } catch (error) {
      console.error(`Error deleting cashout with ID ${id}:`, error);
      throw new HttpException(
        { message: `Failed to delete cashout with ID ${id}` },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
