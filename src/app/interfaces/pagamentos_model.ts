export interface IPagamentoEmployee {
    creci : string,	
    nomeCorretor: string,
    tipoCorretor: string,
    percentComissao?: number //(float entre 1 e 3)
    salario?: number,
    ganhoTotal: number    
}