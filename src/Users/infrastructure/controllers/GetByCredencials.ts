import { Request, Response } from "express";
import getByUseCase from "../../aplication/GetByUseCase";

export default class GetByIdController {
    constructor(readonly useCase: getByUseCase) { }

    async run(req: Request, res: Response) {
        const result = await this.useCase.run(req.params.id);

        if (result === null) {
            return res.status(404).json({
                msg: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            msg: "Usuario encontrado",
            data: result
        });
    }
}
