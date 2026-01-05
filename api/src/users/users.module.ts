import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SupabaseService } from 'src/supabase/supabase.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [UsersService, SupabaseService, ConfigService],
  controllers: [UsersController]
})
export class UsersModule {}
