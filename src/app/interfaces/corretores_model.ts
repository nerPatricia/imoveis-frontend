//exportando o modelo que será utilizado para os funcionários
export interface IEmployee {
    creci : number,	
    nome: string,
    salario?: number,
    dataAdmissao?: string,
    percentComissao?: number //(float entre 1 e 3)
}
  