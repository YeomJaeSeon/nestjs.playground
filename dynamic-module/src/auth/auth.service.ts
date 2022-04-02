import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  get() {
    return 'AuthService instance';
  }
}
