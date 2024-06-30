import { Request, Response } from 'express';
import DeviceUseCase from '../../aplication/DeviceUseCase';


export default class DeviceController {
    constructor(private readonly deviceUseCase: DeviceUseCase) {}

    async addDevice(req: Request, res: Response) {
        try {
            const { nombre, status } = req.body as { nombre: string; status: boolean };
            const device = await this.deviceUseCase.addDevice(nombre, status);

            res.json({ success: true, device });
        } catch (error) {
            console.error('Error adding device:', error);
            res.status(500).json({ success: false, error: 'Error adding device' });
        }
    }

    async getDevices(_req: Request, res: Response) {
        try {
            const devices = await this.deviceUseCase.getDevices();

            res.json({ success: true, devices });
        } catch (error) {
            console.error('Error fetching devices:', error);
            res.status(500).json({ success: false, error: 'Error fetching devices' });
        }
    }

    async triggerDevice(req: Request, res: Response) {
        try {
            const { deviceId } = req.params;
            const success = await this.deviceUseCase.triggerDevice(deviceId);

            res.json({ success });
        } catch (error) {
            console.error('Error triggering device:', error);
            res.status(500).json({ success: false, error: 'Error triggering device' });
        }
    }
}
