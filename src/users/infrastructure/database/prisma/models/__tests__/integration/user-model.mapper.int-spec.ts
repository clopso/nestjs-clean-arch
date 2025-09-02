import { PrismaClient, User } from '@prisma/client';
import { UserModelMapper } from '../../user-model.mapper';
import { ValidationError } from '@/shared/domain/erros/validation-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';

describe('UserModelMapper integration tests', () => {
  let prismaService: PrismaClient;
  let props: any;

  beforeAll(async () => {
    setupPrismaTests();
    prismaService = new PrismaClient();
    await prismaService.$connect();
  });

  beforeEach(async () => {
    await prismaService.user.deleteMany();
    props = {
      id: 'c5b5d895-98a7-47f9-abd8-67a901c277a2',
      name: 'Caio',
      email: 'a@a.com',
      password: '1234',
      createdAt: new Date(),
    };
  });

  afterAll(async () => {
    if (prismaService) {
      await prismaService.$disconnect();
    }
  });

  it('Should throws error when user model is invalid', async () => {
    const model: User = Object.assign(props, { name: null });
    expect(() => UserModelMapper.toEntity(model)).toThrow(ValidationError);
  });

  it('Should convert an user model to an user entity', async () => {
    const model: User = await prismaService.user.create({
      data: props,
    });
    const sut = UserModelMapper.toEntity(model);
    expect(sut).toBeInstanceOf(UserEntity);
    expect(sut.toJSON()).toStrictEqual(props);
  });
});
