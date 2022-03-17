import { ConfigService } from './environment';

export class ProductionConfigService extends ConfigService {
  constructor() {
    super();
    console.log('this is production environment');
  }
  public getEnvironment(): void {
    console.log('this is production environment');
  }
}
