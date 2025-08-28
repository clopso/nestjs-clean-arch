import { UserRepository } from '@/users/domain/repositories/user.repository';
import { BadRequestError } from '../../../shared/application/erros/bad-request-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { BcryptjsHashProvider } from '@/users/infrastructure/database/in-memory/repositories/providers/hash-provider/bcryptjs-hash.provider';
import { UserOutput, UserOutputMapper } from '../dtos/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { InvalidCredentialsError } from '@/shared/application/erros/invalid-credentials-error';

export namespace SignupUseCase {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: BcryptjsHashProvider,
    ) {}
    async execute(input: Input): Promise<Output> {
      const { email, password } = input;
      if (!email || !password) {
        throw new BadRequestError('Input data not provided');
      }

      const entity = await this.userRepository.findByEmail(email);
      const hashPasswordMatches = await this.hashProvider.compareHash(
        password,
        entity.password
      );
      if (!hashPasswordMatches) {
        throw new InvalidCredentialsError('Invalid credentials');
      }

      return UserOutputMapper.toOutput(entity);
    }
  }
}
