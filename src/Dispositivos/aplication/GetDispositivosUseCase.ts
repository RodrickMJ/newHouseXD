import DispositivoRepository from "../domain/DispositivoRepository";
import DispositivoEntry from "../domain/DispositivoEntry";

export default class GetDispositivosUseCase {
  constructor(private dispositivoRepository: DispositivoRepository) {}

  async getDispositivos(): Promise<DispositivoEntry[]> {
    return await this.dispositivoRepository.getDispositivos();
  }
}