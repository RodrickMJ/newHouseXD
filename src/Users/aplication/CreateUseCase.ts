import UserRepository from "../domain/UserRepository";
import { UserCreateRequest } from "../domain/DTOS/UserRequest";
import userEntry from "../domain/UserEntry";

export default class CreateUserCase {
    constructor (readonly entryRepository: UserRepository) {}

    async run (user: UserCreateRequest): Promise<userEntry | null> {
        const userAdded = await this.entryRepository.create(user);

        if (!userAdded) {
            return null;
        }

        return userAdded;
    }
}
