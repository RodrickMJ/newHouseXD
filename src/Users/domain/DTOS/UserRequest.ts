export type UserRole = 'admin' | 'esposa' | 'hijo' | 'invitado' | 'ladron' | 'familiar';

export interface UserRequest {
    username: string;
    email: string;
    password: string;
}

export interface UserCreateRequest extends UserRequest {
    nombre: string;
    rol?: UserRole | null;
}
