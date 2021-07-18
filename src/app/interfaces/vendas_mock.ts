import { Venda } from "./vendas_model";

export const vendasList: Venda[] = [
    {
        codVenda: "100",
        codImovel: "1101",
        valorReal: 1500.50,
        nomeComprador: "Comprador1",
        nomeCorretor: "Corretor1",
        dataVenda: new Date('2019-01-16'),
    },
    {
        codVenda: "101",
        codImovel: "1102",
        valorReal: 1000,
        nomeComprador: "Comprador1",
        nomeCorretor: "Corretor2",
        dataVenda: new Date('2019-01-16'),
    },
    {
        codVenda: "102",
        codImovel: "1103",
        valorReal: 3000.75,
        nomeComprador: "Comprador2",
        nomeCorretor: "Corretor1",
        dataVenda: new Date('2019-01-16'),
    }
]
