/* eslint-disable prettier/prettier */
import { Repository, EntityRepository } from 'typeorm';
import { User } from './auth-entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto || {}
    const user = this.create({ username, password })

    await this.save(user)
  }
}
