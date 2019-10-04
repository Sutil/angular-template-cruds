/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: './assets/mock/',

  urlCount(url: string): string {
    return `${url}.${'count'}`;
  },

  urlAutenticacao: function(functionName: string) {
    return `${this.baseUrl}${functionName}`;
  },

  urlApi: function(apiName: string) {
    return `${this.baseUrl}${apiName}`;
  },

  urlUsuario: function() {
    return `${this.baseUrl}${'usuario.findall.json'}`;
  },
  urlCnpj: function() {
    return `${this.baseUrl}${'cnpj.findall.json'}`;
  },
  urlRecurso: function() {
    return `${this.baseUrl}${'recurso.findall.json'}`;
  },
  urlPerfil: function() {
    return `${this.baseUrl}${'perfil.findall.json'}`;
  },
  urlPerfilUsuarioOrganizacao: function() {
    return `${this.baseUrl}${'usuarioperfilorganizacao.findall.json'}`;
  },
  urlCriterio: function() {
    return `${this.baseUrl}${'criterioanalise.findall.json'}`;
  },
  urlCheckToken: function() {
    return `${this.baseUrl}${'checktoken.json'}`;
  },
  urlEmpresa: function() {
    return `${this.baseUrl}${'empresa.findall.json'}`;
  },
  urlDivisao: function() {
    return `${this.baseUrl}${'divisao.findall.json'}`;
  },
  urlRegional: function() {
    return `${this.baseUrl}${'regional.findall.json'}`;
  },
  urlFilial: function() {
    return `${this.baseUrl}${'filial.findall.json'}`;
  },
  urlAnaliseDeRisco: function() {
    return `${this.baseUrl}${'analisederisco.findall.json'}`;
  },
  urlRegiao: function() {
    return `${this.baseUrl}${'regiao.findall.json'}`;
  },
  urlSegmento: function() {
    return `${this.baseUrl}${'segmento.findall.json'}`;
  },
  urlAtividade: function() {
    return `${this.baseUrl}${'atividade.findall.json'}`;
  },
  urlRamo: function() {
    return `${this.baseUrl}${'ramo.findall.json'}`;
  },
  urlLogin: function() {
    return `${this.baseUrl}${'login'}`;
  },
  urlLogout: function() {
    return `${this.baseUrl}${'logout'}`;
  },
  urlLogAcesso: function() {
    return `${this.baseUrl}${'logs.findall.json'}`;
  },
  urlRecuperaSenha: function() {
    return '';
  },
  urlChangePassword: function() {
    return '';
  },
  urlRedefinePassword: function() {
    return '';
  },
  urlPresencaSemanal: function() {
    return `${this.baseUrl}${'presenca.semanal.json'}`;
  },
  urlPresencaMensal: function() {
    return `${this.baseUrl}${'presenca.mensal.json'}`;
  },
  urlPresencaAnual: function() {
    return `${this.baseUrl}${'presenca.anual.json'}`;
  },
  urlHorasTrabalhadas: function(periodo: string) {
    return `${this.baseUrl}${'horastrabalhadas.'}${periodo}${'.json'}`;
  },
  urlHorasTrabalhadasSemanal: function() {
    return `${this.baseUrl}${'horastrabalhadas.semanal.json'}`;
  },
  urlHorasTrabalhadasDiaria(day: string) {
    return `${this.baseUrl}${'horastrabalhadas.diario.json'}`;
  },
  urlISVSemanal: function() {
    return `${this.baseUrl}${'isv.semanal.json'}`;
  },
  urlISVAnual: function() {
    return `${this.baseUrl}${'isv.anual.json'}`;
  },
  urlISVMensal: function() {
    return `${this.baseUrl}${'isv.mensal.json'}`;
  },
  urlIsvDiario: function(day: string) {
    return `${this.baseUrl}${'isv.diario.json'}`;
  },
  urlPromotores: function() {
    return `${this.baseUrl}${'promotores.findall.json'}`;
  },
  urlPresencaDiaria(day) {
    return `${this.baseUrl}${'presenca.diaria.json'}`;
  },
  urlBrand() {
    return `${this.baseUrl}${'brand.findall.json'}`;
  },
  urlModel() {
    return `${this.baseUrl}${'model.findall.json'}`;
  }
};
