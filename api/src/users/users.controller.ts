import { Controller, Get , Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
