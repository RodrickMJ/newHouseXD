import DeviceRepository from '../domain/DeviceRepository';
import DeviceEntry from '../domain/DeviceEntry';
import DeviceModel from '../../Database/models/Devices';

export default class MongoDeviceRepository implements DeviceRepository {
    async addDevice(nombre: string, status: boolean): Promise<DeviceEntry | null> {
        try {
            const device = new DeviceModel({ nombre, status });
            const result = await device.save();

            return {
                id: result._id as unknown as string,
                nombre: result.nombre,
                status: result.status,
            };
        } catch (error) {
            console.error('Error adding device:', error);
            return null;
        }
    }

    async getDevices(): Promise<DeviceEntry[]> {
        try {
            const devices = await DeviceModel.find().exec();

            return devices.map(device => ({
                id: device._id as unknown as string,
                nombre: device.nombre,
                status: device.status,
            }));
        } catch (error) {
            console.error('Error fetching devices:', error);
            return [];
        }
    }

    async triggerDevice(deviceId: string): Promise<boolean> {
        try {
            
            const device = await DeviceModel.findById(deviceId).exec();

            if (!device) {
                console.error(`Device with ID ${deviceId} not found.`);
                return false;
            }
            // Cambia el estado del dispositivo
            device.status = !device.status; 
            
            const updatedDevice = await device.save();

            return !!updatedDevice; 
        } catch (error) {
            console.error('Error triggering device:', error);
            return false;
        }
    }
}
