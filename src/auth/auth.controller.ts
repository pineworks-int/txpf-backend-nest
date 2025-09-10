import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateResponse } from './auth.types';
import { ValidateTokenDto } from './dto/validate-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('validate')
  @HttpCode(200)
  async validateToken(
    @Body() body: ValidateTokenDto,
  ): Promise<ValidateResponse> {
    const result = await this.authService.validateUserToken(body.token);

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
