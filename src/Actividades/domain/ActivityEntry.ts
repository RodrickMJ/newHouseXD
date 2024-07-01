export default interface ActivityEntry {
    id?: string;
    userName: string;
    dispositivo: string;
    action: string;
    status: boolean;
    timestamp?: Date;
};
