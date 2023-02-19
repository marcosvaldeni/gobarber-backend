import ICreateUserDTO from "modules/users/dto/ICreateUserDTO";
import User from "modules/users/infra/typeorm/entities/User";

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(data: User): Promise<User>;
}