//exportando o modelo que será utilizado para os funcionários
export interface Employee {
    creci : number,	
    nome: string,
    salario?: number,
    data_admissao?: string,
    percent_comissao?: number //(float entre 1 e 3
}
  