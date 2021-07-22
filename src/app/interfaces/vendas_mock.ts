import { IVenda } from "./vendas_model";

export const vendasList: IVenda[] = [
    {
        codVenda: "100",
        codImovel: "1101",
        valorReal: 1500.50,
        nomeComprador: "Comprador1",
        corretor: "101",
        dataVenda: new Date('2019-01-16'),
    },
    {
        codVenda: "101",
        codImovel: "1102",
        valorReal: 1000,
        nomeComprador: "Comprador1",
        corretor: "11",
        dataVenda: new Date('2019-01-16'),
    },
    {
        codVenda: "102",
        codImovel: "1103",
        valorReal: 3000.75,
        nomeComprador: "Comprador2",
        corretor: "11",
        dataVenda: new Date('2019-01-16'),
    }
]
