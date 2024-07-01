import DeviceEntry from './DeviceEntry';

export default interface DeviceRepository {
    addDevice(nombre: string, status: boolean): Promise<DeviceEntry | null>;
    getDevices(): Promise<DeviceEntry[]>;
    triggerDevice(deviceId: string): Promise<boolean>;
}
