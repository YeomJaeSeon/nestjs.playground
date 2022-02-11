import { ConfigService } from './config';

export class DevelopmentConfigService implements ConfigService {
  config(name: string): string {
    return `${name} dev config service 구현체`;
  }
}
