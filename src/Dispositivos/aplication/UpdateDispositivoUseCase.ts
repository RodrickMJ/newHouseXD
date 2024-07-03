import DispositivoRepository from "../domain/DispositivoRepository";
import DispositivoEntry from "../domain/DispositivoEntry";
import { DispositivoRequest } from "../domain/DTOS/DispositivoRequest";

export default class UpdateDispositivoUseCase {
  constructor(private dispositivoRepository: DispositivoRepository) {}

  async updateDispositivo(id: string, name: DispositivoRequest): Promise<DispositivoEntry | null> {
    return await this.dispositivoRepository.updateDispositivo(id, name);
  }
}