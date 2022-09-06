import {randomUUID} from "crypto";
// Campos que estaram dentro do meu usuario

export class User {
    public readonly id: string | undefined;
    public name: string | undefined;
    public email: string | undefined;
    public password: string | undefined;

    constructor(props: Omit<User, "id">, id?: string){
        Object.assign(this, props);

        if(!id){
            this.id = randomUUID();
        }
    }
}