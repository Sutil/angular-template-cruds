import { CnpjServiceMock } from './mock/cnpj.mock.service';
import { CnpjService } from './cnpj.service';
import { AutenticacaoService } from './autenticacao.service';
import { RecursoServiceMock } from './mock/recurso.mock.service';
import { RecursoService } from './recurso.service';
import { PerfilMockService } from './mock/perfil.mock.service';
import { PerfilService } from './perfil.service';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ConfigService } from './config.service';
import { DivisaoService } from './divisao.service';
import { DivisaoServiceMock } from './mock/divisao.mock.service';
import { EmpresaService } from './empresa.service';
import { EmpresaServiceMock } from './mock/empresa.mock.service';
import { FilialService } from './filial.service';
import { FilialServiceMock } from './mock/filial.mock.service';
import { RegionalService } from './regional.service';
import { ForgotPasswordService } from './forgotpassword.service';
import { RegionalServiceMock } from './mock/regional.mock.service';
import { environment } from './../../../environments/environment';

import { UsuarioService } from './usuario.service';
import { UsuarioServiceMock } from 'app/@core/data/mock/usuario.mock.service';
import { UsuarioPerfilOrganizacaoService } from './usuario-perfil-organizacao.service';
import { UsuarioPerfilOrganizacaoServiceMock } from './mock/usuario-perfil-organizacao.mock.service';
import { CriterioAnaliseService } from './criterioanalise.service';
import { CriterioAnaliseServiceMock } from './mock/criterioanalise.mock.service';
import { ClienteService } from './cliente.service';
import { AnaliseDeRiscoService } from './analisederisco.service';
import { AnaliseDeRiscoServiceMock } from './mock/analisederisco.mock.service';
import { AuthService } from '../../auth/auth.service';
import { CheckToken } from './checktoken.service';
import { CheckTokenMock } from './mock/checktoken.mock.service';
import { ForgotPasswordMockService } from './mock/forgotpassword.mock.service';
import { ChangePasswordService } from './changepassword.service';
import { ChangePasswordServiceMock } from './mock/changepassword.mock.service';

/**
 * Prover Mocks para serviços quando trabalhando em modo de desenvolvimento
 * Services não-mock deverão implementar a integração com backend
 */
const SERVICES: Provider[] = environment.production ?
  [
    ConfigService,
    FilialService,
    EmpresaService,
    RegionalService,
    DivisaoService,
    PerfilService,
    UsuarioService,
    RecursoService,
    UsuarioPerfilOrganizacaoService,
    CriterioAnaliseService,
    ClienteService,
    AnaliseDeRiscoService,
    AuthService,
    CheckToken,
    CnpjService,
    ForgotPasswordService,
    ChangePasswordService,
  ] : [
    ConfigService,
    { provide: FilialService, useClass: FilialServiceMock },
    { provide: EmpresaService, useClass: EmpresaServiceMock },
    { provide: RegionalService, useClass: RegionalServiceMock },
    { provide: DivisaoService, useClass: DivisaoServiceMock },
    { provide: PerfilService, useClass: PerfilMockService },
    { provide: UsuarioService, useClass: UsuarioServiceMock },
    { provide: RecursoService, useClass: RecursoServiceMock },
    { provide: UsuarioPerfilOrganizacaoService, useClass: UsuarioPerfilOrganizacaoServiceMock },
    { provide: CriterioAnaliseService, useClass: CriterioAnaliseServiceMock },
    { provide: AnaliseDeRiscoService, useClass: AnaliseDeRiscoServiceMock},
    { provide: AuthService, useClass: AutenticacaoService},
    { provide: CheckToken, useClass: CheckTokenMock},
    { provide: CnpjService, useClass: CnpjServiceMock},
    { provide: ForgotPasswordService, useClass: ForgotPasswordMockService},
    { provide: ChangePasswordService, useClass: ChangePasswordServiceMock},
  ];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
