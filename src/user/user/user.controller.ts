import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from 'src/auth/auth/jwt-auth.guard';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  async searchByQuery(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('query') query: string
  ): Promise<Pagination<UserEntity>> {
    const offset = (page - 1) * limit;
    return await this.usersService.searchByQuery(
      offset,
      limit,
      query
    );
  }


  @Get('/get/single-user')

  @UseGuards(JwtAuthGuard)
  async findSingleUser(@Req() req: Request & { user: UserEntity }) {

    console.log(req?.user, "kkkkk")
    const userinfo = await this.usersService.findOne(req?.user?.id);
    delete userinfo.password;
    return userinfo;
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    return await this.usersService.findOneEmail(email);
  }


  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<UserEntity> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Patch(':id')
  async updatePassword(
    @Param('id') userId: number,
    @Body() updatePasswordDto: UpdateUserDto
  ) {
    const { password } = updatePasswordDto;

    // Call the service to update the user's password
    const updatedUser = await this.usersService.updatePassword(userId, password);

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    // Return the updated user or a success message
    return { message: 'Password updated successfully', user: updatedUser };
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      return await this.usersService.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }


  @Patch('/enable/:id')
  async enable(@Param('id') id: string) {
    return await this.usersService.enable(+id);
  }

  @Patch('/disable/:id')
  async disable(@Param('id') id: string) {
    return await this.usersService.disable(+id);
  }
}
