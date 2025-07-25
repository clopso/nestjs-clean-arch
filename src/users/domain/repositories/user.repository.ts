import { UserEntity } from '../entities/user.entity';
import { SearchableRepositoryInterface } from '@/shared/domain/repositories/searchable-repository-contracts';

export interface UserRepository
  extends SearchableRepositoryInterface<UserEntity, any, any> {
  findByEmail(email: string): Promise<UserEntity>;
  emailExist(email: string): Promise<void>;
}
