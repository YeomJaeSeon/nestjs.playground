import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import exp from 'constants';
import { Cat } from './interfaces/cat.interface';

describe('CatsController', () => {
  let controller: CatsController;
  let catsService: CatsService;
  //
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [CatsController],
  //   }).compile();
  //
  //   controller = module.get<CatsController>(CatsController);
  // });
  // beforeEach(() => {
  //   catsService = new CatsService();
  //   controller = new CatsController(catsService);
  // });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile(); //compile메서드는 비동기메서드이므로 await연산자 필요

    catsService = moduleRef.get<CatsService>(CatsService); // 인스턴스 획득(get메서드로)
    controller = moduleRef.get<CatsController>(CatsController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result: Cat[] = [
        {
          name: 'test',
          age: 10,
          breed: 'test',
        },
      ];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
