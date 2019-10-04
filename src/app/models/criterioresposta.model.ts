import { BasicEntity } from "./base/basicentity.model";
import { CriterioAnalise } from "./criterioanalise.model";
import { Resposta } from "./resposta.model";

export class CriterioResposta extends BasicEntity {
    public criterio: CriterioAnalise = null;
    public resposta: Resposta = null;
    constructor(criterio: CriterioAnalise, resposta: Resposta) {
      super();
      this.criterio = criterio;
      this.resposta = resposta;
    }
  }