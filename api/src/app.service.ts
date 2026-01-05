import { Injectable, OnModuleInit } from '@nestjs/common';
import { SupabaseService } from './supabase/supabase.service';
import { ROLES } from 'libs/types/main';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly supabase: SupabaseService){}
  private async getMockUsers(){
    const userData = await fetch('https://randomuser.me/api/?results=50');
    const result = await userData.json();
    if(result.error) throw result.error;
    const users = result.results.map((u: any)=> {
      return {
        name: `${u.name.first} ${u.name.last}`,
        email: u.email,
        role: ROLES[Math.floor(Math.random() * (2+1))],
        created_at: u.registered.date,
      }
    });
    const {error} = await this.supabase.client
      .from('users')
      .insert(users);
    if(error) throw error;
  }
  async onModuleInit() {
    const {count, error} = await this.supabase.client
      .from('users')
      .select('*' , { count: 'exact', head: true });
    if(error) {
      console.error(error);
      return;
    } 
    if(count != null && count > 0) return;
    else {
      await this.getMockUsers();
    }
  }
  
  getHello(): string {
    return 'Hello World!';
  }
}
