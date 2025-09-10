import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { User } from './auth.types';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async validateUserToken(
    token: string,
  ): Promise<{ valid: boolean; user?: User }> {
    const result = await this.supabaseService.validateToken(token);

    if (!result.valid || !result.user) {
      return this.formatResponse(false);
    }

    const supabaseUser = result.user;
    const isAdmin = supabaseUser.email?.toLowerCase() === 'admin@nspace.link';

    const userWithRole: User = {
      id: supabaseUser.id,
      email: supabaseUser.email,
      role: isAdmin ? 'admin' : 'guest',
    };

    return this.formatResponse(true, userWithRole);
  }

  private formatResponse(
    valid: boolean,
    user?: User,
  ): { valid: boolean; user?: User } {
    return {
      valid,
      user: user || undefined,
    };
  }
}
