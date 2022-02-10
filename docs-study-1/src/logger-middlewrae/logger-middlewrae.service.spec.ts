import { Test, TestingModule } from '@nestjs/testing';
import { LoggerMiddlewraeService } from './logger-middlewrae.service';

describe('LoggerMiddlewraeService', () => {
  let service: LoggerMiddlewraeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerMiddlewraeService],
    }).compile();

    service = module.get<LoggerMiddlewraeService>(LoggerMiddlewraeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
