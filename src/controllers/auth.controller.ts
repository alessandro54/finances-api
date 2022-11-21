import { Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Req() req, @Res() res) {
    const { username, password } = req.body;
    try {
      const { access_token } = await this.authService.login(username, password);
      res.status(200).send({
        message: 'Login successful',
        token: access_token,
        issued: Date.now(),
      });
    } catch (e) {
      res.status(401).send({ error: 'Invalid credentials' });
    }
  }
}
