import UserRepository from "../domain/UserRepository";
import UserResponse from "../domain/DTOS/UserResponse";

export default class getByUseCase {
    constructor(readonly repository: UserRepository) {}

    async run(id: string) {
        const result = await this.repository.getById(id);

        if (result === null) {
            return null;
        }

        const response: UserResponse = {
            id: result.id,
            username: result.username,
            nombre: result.nombre,
            rol: result.rol,
            email: result.email,
            password: result.password,
            permissions: result.permissions
        };

        return response;
    }
}
