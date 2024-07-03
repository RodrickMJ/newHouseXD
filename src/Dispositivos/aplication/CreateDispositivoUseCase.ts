import DispositivoRepository from "../domain/DispositivoRepository";
import DispositivoEntry from "../domain/DispositivoEntry";
import { DispositivoRequest } from "../domain/DTOS/DispositivoRequest";

export default class CreateDispositivoUseCase {
  constructor(private dispositivoRepository: DispositivoRepository) {}

  async createDispositivo(name: DispositivoRequest, type: DispositivoRequest): Promise<DispositivoEntry | null> {
    return await this.dispositivoRepository.createDispositivo(name, type);
  }
}