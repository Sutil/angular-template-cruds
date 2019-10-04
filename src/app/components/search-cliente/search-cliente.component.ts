import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Component, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';

import { Empresa } from 'app/models/empresa.model';
import { EmpresaService } from 'app/@core/data/empresa.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
    selector: 'search-cliente-dialog',
    templateUrl: './search-cliente-dialog.component.html',

})
export class SearchClienteDialogComponent implements OnInit {
    cnpjControl = new FormControl();
    nomeControl = new FormControl();

    private empresas: Observable<Empresa[]>;

    empresasBuscadas: Empresa[] = [];
    empresasFiltradasByCnpj: Observable<Empresa[]>;
    empresasFiltradasByNome: Observable<Empresa[]>;

    constructor(empresaService: EmpresaService) {
        this.empresas = empresaService.findAll();
        this.empresas.subscribe((es: Empresa[]) => this.empresasBuscadas = es);
    }

    filterByCnpj(val: string) {
        const strippedVal = val.replace(/[-\/.]/g, '');
        const es = this.empresasBuscadas.filter((e: Empresa) =>
            e.cnpj.replace(/[-\/.]/g, '').indexOf(strippedVal) >= 0);
        return es;
    }

    filterByNome(val: string) {
        const strippedVal = val.toLowerCase().replace(/\s/g, '');
        const es = this.empresasBuscadas.filter((e: Empresa) =>
            e.razaoSocial.toLowerCase().replace(/\s/g, '').indexOf(strippedVal) >= 0);
        return es;
    }

    displayCnpj(empresa: Empresa): string {
        return empresa ? empresa.cnpj : '';
    }

    displayNome(empresa: Empresa): string {
        return empresa ? empresa.razaoSocial : '';
    }

    reflectCnpjChanges(event: MatAutocompleteSelectedEvent) {
        this.nomeControl.setValue(event.option.value);
    }
    reflectNameChanges(event: MatAutocompleteSelectedEvent) {
        this.cnpjControl.setValue(event.option.value);
    }

    ngOnInit(): void {
        this.empresasFiltradasByCnpj = this.cnpjControl.valueChanges
            .pipe(startWith({} as Empresa),
                map(empresa => {
                    if (empresa) {
                        if (typeof empresa === 'object') {
                            return empresa.cnpj;
                        } else {
                            return empresa;
                        }
                    } else {
                        return '';
                    }
                }),
                map(val => val ? this.filterByCnpj(val) : this.empresasBuscadas.slice()));

        this.empresasFiltradasByNome = this.nomeControl.valueChanges
            .pipe(startWith({} as Empresa),
                map(empresa => {
                    if (empresa) {
                        if (typeof empresa === 'object') {
                            return empresa.razaoSocial;
                        } else {
                            return empresa;
                        }
                    } else {
                        return '';
                    }
                }),
                map(val => val ? this.filterByNome(val) : this.empresasBuscadas.slice()));
    }
}