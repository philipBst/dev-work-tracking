import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAllTracks(): string {
    return 'Hello World!';
  }
}
