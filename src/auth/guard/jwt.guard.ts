import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {
  // keyword for AuthGuard is 'jwt' by default, we can also pass custom key inside PassportStrategy(Strategy, 'custom') inside out jwt strategy
  constructor() {
    super();
  }
}
