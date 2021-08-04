import { IVenda } from "./vendas_model";
import { IEmployee } from "./corretores_model";

export const LISTAVENDAS: IVenda[] = [
    {
        codVenda: "100",
        codImovel: "1101",
        valorReal: 100,
        nomeComprador: "Comprador1",
        corretor: "101",
        dataVenda: new Date('2019-01-16'),
    },
    {
        codVenda: "100",
        codImovel: "1102",
        valorReal: 1000,
        nomeComprador: "Comprador2",
        corretor: "1001",
        dataVenda: new Date('2019-01-16'),
    },
    {
        codVenda: "100",
        codImovel: "1103",
        valorReal: 100,
        nomeComprador: "Comprador3",
        corretor: "1001",
        dataVenda: new Date('2019-02-16'),
    },
    {
        codVenda: "100",
        codImovel: "1104",
        valorReal: 1000,
        nomeComprador: "Comprador1",
        corretor: "1002",
        dataVenda: new Date('2019-02-16'),
    },
    {
        codVenda: "100",
        codImovel: "1105",
        valorReal: 100,
        nomeComprador: "Comprador4",
        corretor: "1002",
        dataVenda: new Date('2019-02-16'),
    },
    {
        codVenda: "11",
        codImovel: "110",
        valorReal: 500,
        nomeComprador: "Comprador0",
        corretor: "1002",
        dataVenda: new Date('2018-02-16'),
    }
]

export const CORRETORES_CT: IEmployee[] = [
    {
        creci : 101,	
        nome: 'Diego',
        salario: 1000,
        dataAdmissao: "2015-01-16",
        percentComissao: 1
    }
]
  
export const CORRETORES_CM: IEmployee[] = [
    {
        creci : 1001,	
        nome: 'Vaas',
        percentComissao: 1.5
    },
    {
        creci : 1002,	
        nome: 'julia',
        percentComissao: 1.5
    },
]