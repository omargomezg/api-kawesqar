import {createQueryBuilder} from "typeorm";
import {HistArticulos} from "../entities/HistArticulos";

export class ProofOfPurchaseService {
    public async deleteById(id: number) {
        const data = await createQueryBuilder("HistArticulos")
            .where("HistArticulos.proofOfPurchase =:proofOfPurchase", {proofOfPurchase: id})
            .getMany();
        console.log(data);
        return data;
        // getManager().query(`SELECT idArticulo, fechaIng, idFact, vencimiento, idSucursal, artValor, 'False',
        // estado, idBodega ROM HistArticulos WHERE idFolio = @idFolio`)
    }
}
