import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SupabaseController } from './supabase/supabase.controller';
import { SupabaseService } from './supabase/supabase.service';

@Module({
  imports: [SupabaseModule, UsersModule, ConfigModule.forRoot()],
  controllers: [AppController, SupabaseController],
  providers: [AppService, SupabaseService],
})
export class AppModule {}
