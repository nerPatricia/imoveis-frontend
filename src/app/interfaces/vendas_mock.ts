import { IVenda } from "./vendas_model";

export const vendasList: IVenda[] = [
    {
        codVenda: "100",
        codigoImovel: "1101",
        valor: 1500.50,
        nomeComprador: "Comprador1",
        nomeCorretor: "Corretor1",
        dataVenda: new Date('2019-01-16'),
    },
    {
        codVenda: "101",
        codigoImovel: "1102",
        valor: 1000,
        nomeComprador: "Comprador1",
        nomeCorretor: "Corretor2",
        dataVenda: new Date('2019-01-16'),
    },
    {
        codVenda: "102",
        codigoImovel: "1103",
        valor: 3000.75,
        nomeComprador: "Comprador2",
        nomeCorretor: "Corretor1",
        dataVenda: new Date('2019-01-16'),
    }
]
