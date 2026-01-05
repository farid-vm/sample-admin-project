import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
@Injectable()
export class UsersService {
  constructor(private readonly supabase: SupabaseService) {}

  public async find(limit=10, page = 1, search?: string) {
    let query = this.supabase.client
      .from('users')
      .select('id, name, email, role, created_at')
      .order('created_at', { ascending: false })
      .range((page-1) * 10, (page * limit) -1 );
    if(search) {
      const escaped = search.replace(/[%_]/g, "\\$&");//Avoid injection
      query = query.or(`name.ilike.*${escaped}*,email.ilike.*${escaped}*`);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  public async findOne(id: string) {
    const { data, error } = await this.supabase.client
      .from('users')
      .select('id, name, email, role, created_at')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  public async update(id: string, updateData: any) {
    if (!updateData || Object.keys(updateData).length === 0) {
      throw new Error('Update data cannot be empty');
    }

    const { data, error } = await this.supabase.client
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select('id, name, email, role, created_at')
      .single();

    if (error) {
      throw error;
    }
    return data;
  }
}
