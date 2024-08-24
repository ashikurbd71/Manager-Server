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
} from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ImageEntity } from './entities/image.entity';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @Post()
  @UseInterceptors(
    FilesInterceptor('profile', 10, {
      storage: diskStorage({
        destination: '../uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async postAdd(
    @UploadedFiles() profile: Express.Multer.File[],
    @Body() createMemberDto: CreateImageDto,
  ): Promise<object> {
    try {
      if (profile && profile.length > 0) {
        // Map files to the structure [0: { path: 'file_path' }, 1: { path: 'file_path' }, ...]
        createMemberDto.profile = profile.map((file, index) => ({
          path: `uploads/${file.filename}`,
        }));
      }
      
      await this.imageService.create(createMemberDto); // Save data
      return {
        message: 'Files uploaded and member created successfully',
        profile: createMemberDto.profile, // Return file paths
      };
    } catch (error) {
      console.error('Error processing request:', error);
      throw new BadRequestException('Error processing request');
    }
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
    FilesInterceptor('profile', 10, {
      storage: diskStorage({
        destination: '../uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateImageDto: UpdateImageDto,
    @UploadedFiles() profile?: Express.Multer.File[],
  ): Promise<object> {
    try {
      if (profile && profile.length > 0) {
        // Ensure each file path is wrapped in an object with a 'path' property
        updateImageDto.profile = profile.map((file) => ({
          path: `uploads/${file.filename}`,
        }));
      }
  
      await this.imageService.update(+id, updateImageDto);
  
      return {
        message: 'Image updated successfully',
        profile: updateImageDto.profile,
      };
    } catch (error) {
      console.error('Error processing request:', error);
      throw new BadRequestException('Error processing request');
    }
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
