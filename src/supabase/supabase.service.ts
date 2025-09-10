import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: ReturnType<typeof createClient>;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL') || '';
    const supabaseKey =
      this.configService.get<string>('SUPABASE_ANON_KEY') || '';

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  getClient() {
    return this.supabase;
  }

  async validateToken(token: string): Promise<{ valid: boolean; user?: any }> {
    try {
      const {
        data: { user },
        error,
      } = await this.supabase.auth.getUser(token);

      if (error || !user) {
        return { valid: false };
      }

      return { valid: true, user };
    } catch (error) {
      console.error('Error validating token:', error);
      return { valid: false };
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('_supabase_migrations')
        .select('*')
        .limit(1);
      return !error;
    } catch {
      return false;
    }
  }
}
