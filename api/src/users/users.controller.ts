import { Controller, Get , Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Query('limit') limit?: string,
    @Query('offset') offset?: string,
    /* @Query('role') role?: string */) {
    if (!limit) limit = '10';
    if (!offset) offset = '1';
    return this.usersService.find(
      parseInt(limit),
      parseInt(offset),
      /* role */
    );
  }
}
