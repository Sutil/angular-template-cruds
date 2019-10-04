/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const baseUrl = "http://localhost:9090/api/";

export const environment = {
  production: true,
  baseUrl: "http://localhost:8080/terceiros/",

  urlCount(url: string): string {
    return `${url}${'count'}`;
  },

  urlAutenticacao: function(functionName: string) {
    return `${this.baseUrl}${functionName}`;
  },

  urlApi: function(apiName: string) {
    return `${this.baseUrl}${"api/"}${apiName}`;
  },
  urlCheckToken: function() {
    return `${this.baseUrl}${"api/"}${"usuario/ping/"}`;
  },
  urlUsuario: function() {
    return `${this.baseUrl}${"api/"}${"usuario/"}`;
  },
  urlCnpj: function() {
    return `${this.baseUrl}${"api/"}${"cnpj/"}`;
  },
  urlRecurso: function() {
    return `${this.baseUrl}${"api/"}${"recurso/"}`;
  },
  urlPerfil: function() {
    return `${this.baseUrl}${"api/"}${"perfil/"}`;
  },
  urlPerfilUsuarioOrganizacao: function() {
    return `${this.baseUrl}${"api/"}${"usuarioperfilorganizacao/dto/"}`;
  },
  urlCriterio: function() {
    return `${this.baseUrl}${"api/"}${"criterio/"}`;
  },
  urlEmpresa: function() {
    return `${this.baseUrl}${"api/"}${"empresa/"}`;
  },
  urlDivisao: function() {
    return `${this.baseUrl}${"api/"}${"divisao/"}`;
  },
  urlRegional: function() {
    return `${this.baseUrl}${"api/"}${"regional/"}`;
  },
  urlFilial: function() {
    return `${this.baseUrl}${"api/"}${"filial/"}`;
  },
  urlAnaliseDeRisco: function() {
    return `${this.baseUrl}${"api/"}${"analisederisco/"}`;
  },
  urlLogout: function() {
    return `${this.baseUrl}${"api/"}${"logout"}`;
  },
  urlLogin: function() {
    return `${this.baseUrl}${"login"}`;
  },
  urlLogAcesso: function() {
    return `${this.baseUrl}${"api/"}${"log/"}`;
  },
  urlChangePassword: function() {
    return `${this.baseUrl}${"api/"}${"usuario/changepassword/"}`;
  },
  urlRecuperaSenha: function() {
    return `${this.baseUrl}${"api/usuario/"}${"forgotpassword"}`;
  },
  urlRedefinePassword: function() {
    return `${this.baseUrl}${'api/usuario/'}${'redefinepassword'}`;
  },
  urlPresencaSemanal: function() {
    return `${this.baseUrl}${'api/'}${'presenca/'}${'semana'}`;
  },
  urlPresencaMensal: function() {
    return `${this.baseUrl}${'api/'}${'presenca/'}${'mes'}`;
  },
  urlPresencaAnual: function() {
    return `${this.baseUrl}${'api/'}${'presenca/'}${'ano'}`;
  },
  urlHorasTrabalhadasSemanal: function() {
    return `${this.baseUrl}${'api/'}${'horastrabalhadas/'}${'semana'}`;
  },
  urlHorasTrabalhadasDiaria(day: string) {
    return `${this.baseUrl}${'api/'}${'horastrabalhadas/'}${day}`;
  },
  urlHorasTrabalhadasAnual: function() {
    return `${this.baseUrl}${'api/'}${'horastrabalhadas/'}${'ano'}`;
  },
  urlHorasTrabalhadas: function(periodo: string) {
    return `${this.baseUrl}${'api/'}${'horastrabalhadas/'}${periodo}`;
  },
  urlISVSemanal: function() {
    return `${this.baseUrl}${'api/'}${'isv/'}${'semana'}`;
  },
  urlIsvDiario: function(day) {
    return `${this.baseUrl}${'api/'}${'isv/'}${day}`;
  },
  urlISVAnual: function() {
    return `${this.baseUrl}${'api/'}${'isv/'}${'ano'}`;
  },
  urlISVMensal: function() {
    return `${this.baseUrl}${'api/'}${'isv/'}${'mes'}`;
  },
  urlPromotores: function() {
    return `${this.baseUrl}${'api/'}${'desempenhoprom/'}${'promotor/'}`
  },
  urlPresencaDiaria(day) {
    return `${this.baseUrl}${'api/'}${'presenca/'}${day}`
  },
};
