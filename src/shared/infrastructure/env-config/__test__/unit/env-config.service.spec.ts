import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigService } from '../../env-config.service';
import { EnvConfigModule } from '../../env-config.module';

describe('EnvConfigService Unit Tests', () => {
  let sut: EnvConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[EnvConfigModule.forRoot({
        isGlobal: true
      })],
      providers: [EnvConfigService],
    }).compile();

    sut = module.get<EnvConfigService>(EnvConfigService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return the variable port', () => {
    expect(sut.getAppPort()).toBe(3000);
  });


  it('should return the node env', () => {
    expect(sut.getNodeEnv()).toBe("test");
  });
});
