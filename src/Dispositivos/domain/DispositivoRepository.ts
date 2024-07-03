import DispositivoEntry from "./DispositivoEntry";
import { DispositivoRequest } from "./DTOS/DispositivoRequest";

export default interface DispositivoRepository {
  createDispositivo(name: DispositivoRequest, type: DispositivoRequest): Promise<DispositivoEntry | null>;
  getDispositivos(): Promise<DispositivoEntry[]>;
  updateDispositivo(id: string, name: DispositivoRequest): Promise<DispositivoEntry | null>;
  deleteDispositivo(id: string): Promise<DispositivoEntry | null>;
}