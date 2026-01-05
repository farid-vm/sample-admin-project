import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import {User} from 'libs/types/main';
@Injectable()
export class UsersService {
  constructor(private readonly supabase: SupabaseService) {}

  public async find(limit=10, offset = 1, role?: string) {
    const { data, error } = await this.supabase.client
      .from('users')
      .select('id, name, email, role, created_at')
      .order('created_at', { ascending: false })
      .range((offset-1) * 10, (offset * limit) -1 );//0to 9, 10to 19 ...

    if (error) throw error;
    return data;
  }
}
