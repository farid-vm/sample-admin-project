import { Controller, Get , Query, Param, Patch, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateData: any) {
    return this.usersService.update(id, updateData);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get()
  async getUsers(@Query('limit') limit?: string,
    @Query('page') page?: string,
    @Query('search') search?: string) {
    if (!limit) limit = '10';
    if (!page) page = '1';
    return this.usersService.find(
      parseInt(limit),
      parseInt(page),
      search
    );
  }
}
