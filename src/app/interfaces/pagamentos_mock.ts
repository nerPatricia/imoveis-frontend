import { IPagamentoEmployee } from "./pagamentos_model";

export const pagamentosList: IPagamentoEmployee[] = [
    {
        creci : '101',	
        nomeCorretor: 'Diego',
        tipoCorretor: 'Contratado',
        percentComissao: 1,
        salario: 1000,
        ganhoTotal: 4000
    },
    {
        creci : '102',	
        nomeCorretor: 'Caio',
        tipoCorretor: 'Contratado',
        percentComissao: 1,
        salario: 1000,
        ganhoTotal: 2500
    },
    {
        creci : '201',	
        nomeCorretor: 'Rafael',
        tipoCorretor: 'Comissionado',
        percentComissao: 2.5,
        salario: 0,
        ganhoTotal: 1500
    },
    {
        creci : '202',	
        nomeCorretor: 'Fabiana',
        tipoCorretor: 'Comissionado',
        percentComissao: 1.5,
        salario: 0,
        ganhoTotal: 3500
    },
]