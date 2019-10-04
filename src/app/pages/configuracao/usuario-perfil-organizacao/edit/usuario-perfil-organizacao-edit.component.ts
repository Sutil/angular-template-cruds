import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatOption, MatSelectChange, MatSnackBar } from '@angular/material';

import { CustomValidators } from 'app/components/validators/custom-validators';
import { Divisao } from 'app/models/divisao.model';
import { DivisaoService } from 'app/@core/data/divisao.service';
import { Empresa } from 'app/models/empresa.model';
import { EmpresaService } from 'app/@core/data/empresa.service';
import { Filial } from 'app/models/filial.model';
import { FilialService } from 'app/@core/data/filial.service';
import { Perfil } from 'app/models/perfil.model';
import { PerfilService } from 'app/@core/data/perfil.service';
import { Regional } from 'app/models/regional.model';
import { RegionalService } from 'app/@core/data/regional.service';
import { Usuario } from 'app/models/usuario.model';
import { UsuarioPerfilOrganizacao } from 'app/models/usuarioperfilorganizacao.model';
import { UsuarioPerfilOrganizacaoService } from 'app/@core/data/usuario-perfil-organizacao.service';
import { UsuarioService } from 'app/@core/data/usuario.service';
import { AbstractEntityComponent } from '../../../../components/abstract';

@Component({
  selector: 'usuario-perfil-organizacao-edit',
  templateUrl: './usuario-perfil-organizacao-edit.component.html',
  styleUrls: ['./usuario-perfil-organizacao-edit.component.scss'],
})
export class UsuarioPerfilOrganizacaoEditComponent extends
  AbstractEntityComponent<UsuarioPerfilOrganizacao, UsuarioPerfilOrganizacaoService>
  implements OnInit {

  entity: UsuarioPerfilOrganizacao;
  usuarios: Usuario[] = [];
  perfis: Perfil[] = [];
  empresas: Empresa[] = [];
  divisoes: Divisao[] = [];
  regionais: Regional[] = [];
  filiais: Filial[] = [];

  constructor(activatedRoute: ActivatedRoute,
    service: UsuarioPerfilOrganizacaoService,
    fb: FormBuilder,
    router: Router,
    snackBar: MatSnackBar,
    public usuarioService: UsuarioService,
    public perfilService: PerfilService,
    public empresaService: EmpresaService,
    public divisaoService: DivisaoService,
    public regionalService: RegionalService,
    public filialService: FilialService) {
    super(activatedRoute, service, fb, router, new UsuarioPerfilOrganizacao(), snackBar);
    usuarioService.findAll().subscribe((us: Usuario[]) => {
      this.usuarios = us;
    });

    perfilService.findAll().subscribe((ps: Perfil[]) => {
      this.perfis = ps;
    });

    // empresaService.findAll().subscribe((es: Empresa[]) => {
    //   this.empresas = es;
    // });
  }

  ngOnInit() {
    super.ngOnInit();

    // Devido a um bug no Angular, "required" em selects não está funcionando
    // Então temos que fazer na mão
    const requiredFields = ['usuario', 'perfil'];
    for (const k of requiredFields) {
      if (this.entity.hasOwnProperty(k)) {
        const control: AbstractControl = this.entityForm.get(k);
        control.setValidators(CustomValidators.required);
        control.updateValueAndValidity();
      }
    }
  }

  getListUrlRoute(): UrlTree {
    return this.router.createUrlTree(['../..'], { relativeTo: this.activatedRoute });
  }

  updateEntity(newEntity?: UsuarioPerfilOrganizacao): void {
    // if (newEntity) {
    //   this.carregaDivisoes(newEntity);

    //   this.carregaRegional(newEntity);

    //   this.carregaFilial(newEntity);
    // }

    this.entity = newEntity || new UsuarioPerfilOrganizacao();
    this.entityForm.patchValue(this.entity);
  }

  carregaDivisoes(newEntity: UsuarioPerfilOrganizacao){
    // if (newEntity.empresa) {
    //     this.divisaoService.findByEmpresa(newEntity.empresa.id).subscribe((ds: Divisao[]) => {
    //       this.divisoes = ds;
    //     });
    //   }
  }

  carregaRegional(newEntity: UsuarioPerfilOrganizacao){
    // if (newEntity.divisao){
    //     this.regionalService.findByDivisao(newEntity.divisao.id).subscribe((rs: Regional[]) => {
    //       this.regionais = rs;
    //     });
    // }
  }

  carregaFilial(newEntity: UsuarioPerfilOrganizacao){
    // if (newEntity.regional){
    //   this.filialService.findByRegional(newEntity.regional.id).subscribe((fs: Filial[]) => {
    //     this.filiais = fs;
    //   })
    // }
  }

  get title() { return this.isNew ? 'Novo relacionamento Usuário - Perfil' : 'Editar relacionamento Usuário - Perfil'; }

  compareEntity(e1, e2) {
    return (e1 === null && e2 === null) || (e1 !== null && e2 !== null && e1.id === e2.id);
  }

  empresaSelecionada(event: MatSelectChange) {
    // this.entityForm.get('divisao').reset();
    // this.entityForm.get('regional').reset();
    // this.entityForm.get('filial').reset();
    // this.divisoes = [];
    // this.regionais = [];
    // this.filiais = [];

    // const e: Empresa = event.value;
    // if (e) {
    //   this.divisaoService.findByEmpresa(e.id).subscribe((ds: Divisao[]) => { this.divisoes = ds });
    // }
  }

  divisaoSelecionada(event: MatSelectChange) {
    this.entityForm.get('regional').reset();
    this.entityForm.get('filial').reset();
    this.regionais = [];
    this.filiais = [];

    const d: Divisao = event.value;
    if (d) {
      this.regionalService.findByDivisao(d.id).subscribe((rs: Regional[]) => { this.regionais = rs });
    }
  }

  regionalSelecionada(event: MatSelectChange) {
    this.entityForm.get('filial').reset();
    this.filiais = [];

    const r: Regional = event.value
    if (r) {
      this.filialService.findByRegional(r.id).subscribe((fs: Filial[]) => { this.filiais = fs });
    }
  }
}