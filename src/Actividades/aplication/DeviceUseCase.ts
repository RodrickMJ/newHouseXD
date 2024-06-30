import DeviceRepository from '../domain/DeviceRepository';
import DeviceEntry from '../domain/DeviceEntry';

export default class DeviceUseCase {
    constructor(private readonly repository: DeviceRepository) {}

    async addDevice(nombre: string, status: boolean): Promise<DeviceEntry | null> {
        return this.repository.addDevice(nombre, status);
    }

    async getDevices(): Promise<DeviceEntry[]> {
        return this.repository.getDevices();
    }

    async triggerDevice(deviceId: string): Promise<boolean> {
        return this.repository.triggerDevice(deviceId);
    }
}
