import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ManagerEntity } from './entities/manager.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) { }

  @Post()
  @UseInterceptors(FileInterceptor('profile', {
    storage: diskStorage({
      destination: './uploads', // Set the destination for uploaded files
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // Generate a unique filename
        const ext = extname(file.originalname); // Get the file extension
        callback(null, `${uniqueSuffix}${ext}`); // Create the unique filename
      },
    }),
  }))
  async postAdd(@UploadedFile() profile: Express.Multer.File, @Body() createManagerDto: CreateManagerDto): Promise<object> {
    if (profile) {
      createManagerDto.profile = `uploads/${profile.filename}`; // Save the file path to the DTO
    }
    await this.managerService.create(createManagerDto); // Create the member with the data in createMemberDto
    return {
      message: 'File uploaded and member created successfully',
      profile: createManagerDto.profile, // Return the profile URL
    };
  }

  @Get()
  async findAll(): Promise<{ message: string; member: ManagerEntity[] }> {
    try {
      const member = await this.managerService.findAll();
      return { message: 'Successfully retrieved all members', member };
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
  ): Promise<Pagination<ManagerEntity>> {
    const offset = (page - 1) * limit;
    return await this.managerService.searchByQuery(
      offset,
      limit,
      query
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.managerService.findOne(+id);
  }


  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('profile'),
  )
  update(
    @Param('id') id: string,
    @Body() updateManagerDto: UpdateManagerDto,
    @UploadedFile() profile?: Express.Multer.File,
  ) {
    if (profile) {
      const fileName = `${profile.filename}`;
      updateManagerDto.profile = `uploads/${fileName}`;
    }

    return this.managerService.update(+id, updateManagerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.managerService.remove(+id);
  }

  @Patch('/enable/:id')
  async enable(@Param('id') id: string) {
    return await this.managerService.enable(+id);
  }

  @Patch('/disable/:id')
  async disable(@Param('id') id: string) {
    return await this.managerService.disable(+id);
  }

}
