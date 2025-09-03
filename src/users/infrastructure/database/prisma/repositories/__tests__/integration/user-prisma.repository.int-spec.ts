import { PrismaClient } from '@prisma/client';
import { UserPrismaRepository } from '../../user-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { NotFoundError } from '@/shared/domain/erros/not-found-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { UserModelMapper } from '../../../models/user-model.mapper';
import { UserRepository } from '@/users/domain/repositories/user.repository';

describe('UserPrismaRepository integration tests', () => {
  const prismaService = new PrismaClient();
  let sut: UserPrismaRepository;
  let module: TestingModule;

  beforeAll(async () => {
    setupPrismaTests();
    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();
  });

  beforeEach(async () => {
    sut = new UserPrismaRepository(prismaService as any);
    await prismaService.user.deleteMany();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('Should throws error when entity not found', async () => {
    expect(() => sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError(`UserModel not found using ID fakeId`),
    );
  });

  it('Should find an entity by id', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    const newUser = await prismaService.user.create({
      data: entity.toJSON(),
    });
    const output = await sut.findById(newUser.id)
    expect(output.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('Should insert an new entity', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    await sut.insert(entity)
    const output = await prismaService.user.findUnique({
      where: {
        id: entity._id
      }
    })
    expect(output).toStrictEqual(entity.toJSON());
  });

  it('Should return all users', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    await prismaService.user.create({
      data: entity.toJSON(),
    });
    const output = await sut.findAll()
    expect(output).toHaveLength(1)
    output.map(item => expect(item.toJSON()).toStrictEqual(entity.toJSON()))
  });

  describe('Search method tests', () => {
    it('Should apply only pagination when other params are null', async () => {
      const createdAt = new Date()
      const entities: UserEntity[] = []
      const arrange = Array(16).fill(UserDataBuilder({}))
      arrange.forEach((element, index) => {
        entities.push(
          new UserEntity({
            ...element,
            name: `User${index}`,
            email: `test${index}@mail.com`,
            createdAt: new Date(createdAt.getTime() + index),
          })
        )
      })

      await prismaService.user.createMany({
        data: entities.map(item => item.toJSON())
      })

      const searchOutput = await sut.search(new UserRepository.SearchParams())
      expect(searchOutput).toBeInstanceOf(UserRepository.SearchResult)
      expect(searchOutput.total).toBe(16)
      expect(searchOutput.items.length).toBe(15)
      searchOutput.items.forEach(item => {
        expect(item).toBeInstanceOf(UserEntity)
      })
    });
  });
});
