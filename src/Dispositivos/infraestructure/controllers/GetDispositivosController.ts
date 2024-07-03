import { Request, Response } from 'express';
import GetDispositivosUseCase from '../../aplication/GetDispositivosUseCase';

export default class GetDispositivosController {
  constructor(private getDispositivosUseCase: GetDispositivosUseCase) {}

  async getDispositivos(req: Request, res: Response) {
    const dispositivos = await this.getDispositivosUseCase.getDispositivos();
    return res.status(200).json({ success: true, data: dispositivos });
  }
}