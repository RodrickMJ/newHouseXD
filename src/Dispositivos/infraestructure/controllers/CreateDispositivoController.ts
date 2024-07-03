import { Request, Response } from 'express';
import CreateDispositivoUseCase from '../../aplication/CreateDispositivoUseCase';

export default class CreateDispositivoController {
    constructor(readonly createDispositivoUseCase: CreateDispositivoUseCase) {}

    async createDispositivo(req: Request, res: Response) {
        const { name, type } = req.body;

        try {
            const dispositivo = await this.createDispositivoUseCase.createDispositivo(name, type);
            console.log(dispositivo);
            if (!dispositivo) {
                return res.status(400).json({
                    success: false,
                    msg: `El dispositivo con nombre '${name}' ya existe o hubo un error al crearlo.`,
                });
            }
            
            return res.status(201).json({
                success: true,
                data: dispositivo,
                msg: "Dispositivo creado con éxito"
            });
        } catch (error) {
            console.error("Error en createDispositivoController:", error);
            return res.status(500).json({
                success: false,
                msg: "Error interno del servidor"
            });
        }
    }
}
