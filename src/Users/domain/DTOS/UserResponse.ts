export default interface UserResponse {
    id: number;
    userName: string;
    nombre: string;
    email: string;
    password: string;
    rol: string | null;
    permissions: string[];
}
