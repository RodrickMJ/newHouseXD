import { UserCreateRequest } from "./DTOS/UserRequest";
import userEntry from "./UserEntry";

export default interface UserRepository {
    create(user: UserCreateRequest): Promise<userEntry | null>;
    getById(id: string): Promise<userEntry | null>;
    findByUsername(username: string): Promise<userEntry | null>;
}
