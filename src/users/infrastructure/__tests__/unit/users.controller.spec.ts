import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../users.controller';
import { UserOutput } from '@/users/application/dtos/user-output';
import { SignupUseCase } from '@/users/application/usecases/signup.usecase';
import { SignupDto } from '../../dtos/signup.dto';

describe('UsersController unit tests', () => {
  let sut: UsersController;
  let id: string;
  let props: UserOutput;

  beforeEach(async () => {
    sut = new UsersController();
    id = 'c5b5d895-98a7-47f9-abd8-67a901c277a2';
    props = {
      id,
      name: 'Caio',
      email: 'a@a.com',
      password: '1234',
      createdAt: new Date(),
    };
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create an user', async () => {
    const output: SignupUseCase.Output = props;
    const mockSignupUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['signupUseCase'] = mockSignupUseCase as any
    const input: SignupDto = {
      name: 'Caio',
      email: 'a@a.com',
      password: '1234',
    };
    const result = await sut.create(input);
    expect(mockSignupUseCase.execute).toHaveBeenCalledWith(input)
    expect(output).toMatchObject(result);
  });
});
