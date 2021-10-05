import { Connection, getConnection, getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

interface IRequest {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    games?: [
      {
        id: string;
        title: string;
        created_at: Date;
        updated_at: Date;
      }
    ]
}

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = await this.repository.findOneOrFail(
      {id: user_id},
      {relations: ["games"]}
    );

    return user;                     
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(); // Complete usando raw query
  }
}
