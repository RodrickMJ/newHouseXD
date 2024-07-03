import DispositivoRepository from "../domain/DispositivoRepository";
import DispositivoEntry from "../domain/DispositivoEntry";

export default class DeleteDispositivoUseCase {
  constructor(private dispositivoRepository: DispositivoRepository) {}

  async deleteDispositivo(id: string): Promise<DispositivoEntry | null> {
    return await this.dispositivoRepository.deleteDispositivo(id);
  }
}