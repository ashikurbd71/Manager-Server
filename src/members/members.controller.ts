import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profile'))
  async postAdd(@UploadedFile() profile: Express.Multer.File, @Body() createMemberDto: CreateMemberDto): Promise<object> {
    // Here you can handle the profile file (e.g., save it to the server or cloud storage)
    // And also create the member with the rest of the data in createMemberDto

    await this.membersService.create(createMemberDto);

    return {
      message: 'File uploaded and member created successfully',
    };
  }

  @Get()
  async findAll() {
    return this.membersService.findAll();
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
}
