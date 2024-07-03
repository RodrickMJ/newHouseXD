import { Request, Response } from 'express';
import UpdateDispositivoUseCase from '../../aplication/UpdateDispositivoUseCase';

export default class UpdateDispositivoController {
  constructor(private updateDispositivoUseCase: UpdateDispositivoUseCase) {}

  async updateDispositivo(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    const dispositivo = await this.updateDispositivoUseCase.updateDispositivo(id, name);
    console.log(dispositivo);
    if (!dispositivo) {
      return res.status(500).json({ success: false, message: 'Error updating dispositivo' });
    }
    return res.status(200).json({ success: true, data: dispositivo });
  }
}