import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./ICreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private usersRepostitory: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}
  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepostitory.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("Usuario já existe");
    }

    const user = new User(data);

    await this.usersRepostitory.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Luan Christian",
        email: "luanchristian@gmail.com",
      },
      subject: "Seja bem-vindo à plataforma ",
      body: "<p>Você já pode fazer o login em nossa plataforma</p>",
    });
  }
}
