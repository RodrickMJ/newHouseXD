import { Request, Response } from 'express';
import DeleteDispositivoUseCase from '../../aplication/DeleteDispositivoUseCase';

export default class DeleteDispositivoController {
  constructor(private deleteDispositivoUseCase: DeleteDispositivoUseCase) {}

  async deleteDispositivo(req: Request, res: Response) {
    const { id } = req.params;
    const dispositivo = await this.deleteDispositivoUseCase.deleteDispositivo(id);
    console.log(dispositivo);
    if (!dispositivo) {
      return res.status(500).json({ success: false, message: 'Error deleting dispositivo' });
    }
    return res.status(200).json({ success: true, message: 'Dispositivo deleted successfully' });
  }
}