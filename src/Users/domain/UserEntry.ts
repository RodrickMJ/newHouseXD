export default interface userEntry {
    id: number;
    userName: string;
    nombre: string;
    email: string;
    password: string;
    rol: string | null;
    permissions: string[];
}
