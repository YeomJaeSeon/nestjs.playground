import { ConfigService } from './environment';

export class DevelopmentConfigService extends ConfigService {
  constructor() {
    super();
    console.log('this is development environment');
  }

  public getEnvironment(): void {
    console.log('this is development environment');
  }
}
