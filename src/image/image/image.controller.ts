import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ImageEntity } from './entities/image.entity';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @Post()
  @UseInterceptors(FileInterceptor('profile', {
    storage: diskStorage({
      destination: '../uploads', // Set the destination for uploaded files
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // Generate a unique filename
        const ext = extname(file.originalname); // Get the file extension
        callback(null, `${uniqueSuffix}${ext}`); // Create the unique filename
      },
    }),
  }))
  async postAdd(@UploadedFile() profile: Express.Multer.File, @Body() createManagerDto: CreateImageDto): Promise<object> {
    if (profile) {
      createManagerDto.profile = `uploads/${profile.filename}`; // Save the file path to the DTO
    }
    await this.imageService.create(createManagerDto); // Create the member with the data in createMemberDto
    return {
      message: 'File uploaded and member created successfully',
      profile: createManagerDto.profile, // Return the profile URL
    };
  }



  @Get()
  findAll() {
    return this.imageService.findAll();
  }

  @Get('search')
  async searchByQuery(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('query') query: string,
  ): Promise<Pagination<ImageEntity>> {
    const offset = (page - 1) * limit;
    return await this.imageService.searchByQuery(offset, limit, query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.imageService.findOne(+id);
  }
 
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('/uploads'),
  )

  
  update(
    @Param('id') id: string,
    @Body() updateManagerDto: UpdateImageDto,
    @UploadedFile() profile?: Express.Multer.File,
  ) {
    if (profile) {
      const fileName = `${profile.filename}`;
      updateManagerDto.profile = `/uploads${fileName}`;
    }

    return this.imageService.update(+id, updateManagerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }

  @Patch('/enable/:id')
  async enable(@Param('id') id: string) {
    return await this.imageService.enable(+id);
  }

  @Patch('/disable/:id')
  async disable(@Param('id') id: string) {
    return await this.imageService.disable(+id);
  }
}
