import { Injectable } from '@angular/core';

/**
 * Serviço que retorna valores de configuração, unificando certas constantes.
 */
@Injectable()
export class ConfigService {

  private server = 'localhost:8080';
  private protocol = 'http://';

  private login_point = '/login';

  private USE_SERVER_LOGIN = false;

  constructor() { }

  public useServerLogin = () => this.USE_SERVER_LOGIN;
  public getServer = () => this.server;
  public getProcotol = () => this.protocol;
  public getLoginUrl = () => this.protocol + this.server + this.login_point;

  // public MAP_COLORING: [{ threshold: number, weakcolor: string, strongcolor: string }] = [
  //   { threshold: 0.20, weakcolor: 'lightsalmon', strongcolor: 'red' },
  //   { threshold: 0.40, weakcolor: 'pink', strongcolor: 'orange' },
  //   { threshold: 0.60, weakcolor: 'lightyellow', strongcolor: 'yellow' },
  //   { threshold: 0.80, weakcolor: 'lightgreen', strongcolor: 'green' },
  //   { threshold: 1.0, weakcolor: 'lightblue', strongcolor: 'blue' },
  // ];


}
