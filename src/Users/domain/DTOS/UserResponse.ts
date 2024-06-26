export default interface UserResponse {
    id: number;
    username: string;
    nombre: string;
    email: string;
    password: string;
    rol: string | null;
    permissions: string[];
}
