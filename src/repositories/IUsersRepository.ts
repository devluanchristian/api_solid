//metodos de salvar e buscar o USUARIO
import { User } from "../entities/User";

export interface IUsersRepository {
    findByEmail(email: string): Promise<User>
    save(user: User): Promise<void>
}