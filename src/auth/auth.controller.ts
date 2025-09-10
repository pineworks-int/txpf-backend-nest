import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { ValidateResponse } from './auth.types';
import { ValidateTokenDto } from './dto/validate-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Post('validate')
  async validateToken(
    @Body() body: ValidateTokenDto,
  ): Promise<ValidateResponse> {
    const result = await this.supabaseService.validateToken(body.token);

    if (result.valid) {
      return {
        valid: true,
        user: result.user || null,
      };
    } else {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
