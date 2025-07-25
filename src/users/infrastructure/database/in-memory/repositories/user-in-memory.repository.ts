import { ConflictError } from '@/shared/domain/erros/conflict-error';
import { NotFoundError } from '@/shared/domain/erros/not-found-error';
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory-searchable.repository';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repository';

export class UserInMemoryRepository
  extends InMemorySearchableRepository<UserEntity>
  implements UserRepository
{
  async findByEmail(email: string): Promise<UserEntity> {
    const _email = `${email}`;
    const entity = this.items.find((item) => item.id === _email);
    if (!entity) {
      throw new NotFoundError(`Entity not found using email ${email}`);
    }

    return entity;
  }

  async emailExist(email: string): Promise<void> {
    const _email = `${email}`;
    const entity = this.items.find((item) => item.id === _email);
    if (entity) {
      throw new ConflictError(`Email address already used`);
    }
  }
}
