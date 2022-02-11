import { ConfigService } from './config';

export class ProductionConfigService implements ConfigService {
  config(name: string): string {
    return `${name} prod config service 구현체`;
  }
}
