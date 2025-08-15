import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, HttpException, HttpStatus } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MemberEntity } from './entities/member.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) { }

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
  async postAdd(@UploadedFile() profile: Express.Multer.File, @Body() createMemberDto: CreateMemberDto): Promise<object> {
    if (profile) {
      createMemberDto.profile = `uploads/${profile.filename}`; // Save the file path to the DTO
    }
    await this.membersService.create(createMemberDto); // Create the member with the data in createMemberDto
    return {
      message: 'File uploaded and member created successfully',
      profile: createMemberDto.profile, // Return the profile URL
    };
  }

  @Get()
  async findAll(): Promise<{ message: string; member: MemberEntity[] }> {
    try {
      const member = await this.membersService.findAll();
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
  ): Promise<Pagination<MemberEntity>> {
    const offset = (page - 1) * limit;
    return await this.membersService.searchByQuery(
      offset,
      limit,
      query
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }


  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('profile'),
  )
  update(
    @Param('id') id: string,
    @Body() UpdateMemberDto: UpdateMemberDto,
    @UploadedFile() profile?: Express.Multer.File,
  ) {
    if (profile) {
      const fileName = `${profile.filename}`;
      UpdateMemberDto.profile = `uploads/${fileName}`;
    }

    return this.membersService.update(+id, UpdateMemberDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }

  @Patch('/enable/:id')
  async enable(@Param('id') id: string) {
    return await this.membersService.enable(+id);
  }

  @Patch('/disable/:id')
  async disable(@Param('id') id: string) {
    return await this.membersService.disable(+id);
  }

}
