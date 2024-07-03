import DispositivoRepository from "../domain/DispositivoRepository";
import DispositivoEntry from "../domain/DispositivoEntry";
import DispositivoModel, { IDispositivo } from "../../Database/models/Dispositivo";
import { DispositivoRequest } from "../domain/DTOS/DispositivoRequest";

export default class MongoDispositivoRepository implements DispositivoRepository {
  async createDispositivo(name: DispositivoRequest, status: DispositivoRequest): Promise<DispositivoEntry | null> {
    try {
      const dispositivo = {name, status};
      const resultCreate = new DispositivoModel(dispositivo);
      const result = await resultCreate.save();
      
      const response: DispositivoEntry = {
        id: result._id as unknown as string,
        name: result.name,
        status: result.status,
      };
      return response;
    } catch (error) {
      if (error instanceof Error) {
        if ((error as any).code === 11000) { 
            console.error(`Error creando dispositivo: El dispositivo con nombre '${name}' ya existe.`);
            return null;
        }
        console.error("Error creando dispositivo:", error);
        return null;
    } else {
        console.error("Error desconocido:", error);
        return null;
    }
    }
  }

  async getDispositivos(): Promise<DispositivoEntry[]> {
    try {
      const dispositivos = await DispositivoModel.find().exec();
      return dispositivos.map(dispositivo => ({
        id: dispositivo._id as unknown as string,
        name: dispositivo.name,
        status: dispositivo.status,
      }));
    } catch (error) {
      console.error('Error fetching dispositivos:', error);
      return [];
    }
  }

  async updateDispositivo(id: string, request: DispositivoRequest): Promise<DispositivoEntry | null> {
    try {
      const dispositivo = await DispositivoModel.findByIdAndUpdate(id, request).exec();
      if (!dispositivo) return null;
      const response: DispositivoEntry = {
        id: dispositivo._id as unknown as string,
        name: dispositivo.name,
        status: dispositivo.status,
      };
      return response;
    } catch (error) {
      console.error('Error updating dispositivo:', error);
      return null;
    }
  }

  async deleteDispositivo(id: string): Promise<DispositivoEntry | null> {
    try {
      const dispositivo = await DispositivoModel.findByIdAndDelete(id).exec();
      if (!dispositivo) return null;
      const response: DispositivoEntry = {
        id: dispositivo._id as unknown as string,
        name: dispositivo.name,
        status: dispositivo.status,
      };
      return response;
    } catch (error) {
      console.error('Error deleting dispositivo:', error);
      return null;
    }
  }
}