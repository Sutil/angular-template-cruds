import 'rxjs/add/observable/of';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import {
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSnackBarModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DataModule } from 'app/@core/data/data.module';
import { FormWrapperModule } from 'app/components/form-wrapper/form-wrapper.module';
import { ListWrapperModule } from 'app/components/list-wrapper/list-wrapper.module';
import { EnumToArrayPipeModule } from 'app/enum-to-array';
import { Metodo } from 'app/models/metodo.enum';
import { Observable } from 'rxjs/Observable';

import { routedComponents, routes } from '../recurso-routing.module';
import { RecursoEditComponent } from './recurso-edit.component';


class MockActivatedRoute extends ActivatedRoute {
    constructor() {
        super();
        this.params = Observable.of({ id: 'new' });
    }
}

describe('RecursoEditComponent', () => {
    let component: RecursoEditComponent;
    let fixture: ComponentFixture<RecursoEditComponent>;

    let metodo: AbstractControl;
    let url: AbstractControl;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ListWrapperModule,
                FormWrapperModule,
                MatFormFieldModule,
                MatInputModule,
                MatSnackBarModule,
                MatOptionModule,
                MatSelectModule,
                EnumToArrayPipeModule,
                DataModule.forRoot(),
                HttpClientTestingModule,
                RouterTestingModule.withRoutes(routes),
                BrowserAnimationsModule,
            ],
            declarations: [...routedComponents],
            providers: [{ provide: ActivatedRoute, useClass: MockActivatedRoute }],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecursoEditComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();

        metodo = component.entityForm.get('metodo');
        url = component.entityForm.get('url');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be a new entity', () => {
        expect(component.isNew).toBeTruthy();
    });

    it('should not be loading', () => {
        expect(component.loading).toBeFalsy();
    });

    it('form should be invalid', () => {
        expect(component.entityForm.invalid).toBeTruthy();
    });

    it('should define methods', () => {
        expect(component.metodos).toBeDefined();
        expect(Object.keys(component.metodos).length / 2).toBeGreaterThan(0);
    });

    it('should require method without input', () => {
        expect(metodo.errors).toBeTruthy();
    });

    it('should require URL without input', () => {
        expect(url.errors['required']).toBeTruthy();
    });

    it('method should be valid when selected', () => {
        metodo.setValue(Metodo.GET);
        expect(metodo.valid).toBeTruthy();
    });

    it('url should be valid when written', () => {
        url.setValue('http://example.com/get');
        expect(url.valid).toBeTruthy();
    });

    it('should be invalid when input null method', () => {
        metodo.setValue(null);
        expect(metodo.valid).toBeFalsy();
    });

    it('should be invalid when input "" url', () => {
        url.setValue('');
        expect(url.valid).toBeFalsy();
    });

    it('should be valid when both input', () => {
        metodo.setValue(Metodo.GET);
        url.setValue('http://example.com/get');
        expect(component.entityForm.valid).toBeTruthy();
    });

});
