import { Divisao } from './divisao.model'
import { Organizacao } from './base/organizacao.model'

export class Regional extends Organizacao {
  public nome: string = ''
  public divisao: Divisao = new Divisao()
}
