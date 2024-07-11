import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

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
  async postAdd(@UploadedFile() profile: Express.Multer.File, @Body() createMemberDto: CreateMemberDto): Promise<object> {
    if (profile) {
      createMemberDto.profile = `uploads/${profile.filename}`; // Save the file path to the DTO
    }
    await this.membersService.create(createMemberDto); // Create the member with the data in createMemberDto
    return {
      message: 'File uploaded and member created successfully',
      profile: createMemberDto.profile, // Return the image URL
    };
  }

  @Get()
  async findAll() {
    return this.membersService.findAll();
  }

  @Get('search')
  async search(@Query('query') query: string) {
    const results = await this.membersService.searchByQuery(query);
    return results;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }

  @Patch('/enable')

  async enable(@Query('id') id: string) {
    return await this.membersService.enable(+id);
  }

  @Patch('/disable')

  async disable(@Query('id') id: string) {
    return await this.membersService.disable(+id);
}

}
