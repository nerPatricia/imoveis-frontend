//exportando o modelo que será utilizado para os funcionários
export interface IEmployee {
    tipo: string;
    creci : number,	
    nome: string,
    salario?: number,
    dataAdmissao?: Date,
    comissao?: number //(float entre 1 e 3)
}
  