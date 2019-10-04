import 'rxjs/add/observable/of';

import { CommonModule, Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatSnackBarModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DataModule } from 'app/@core/data/data.module';
import { FormWrapperModule } from 'app/components/form-wrapper/form-wrapper.module';
import { ListWrapperModule } from 'app/components/list-wrapper/list-wrapper.module';
import { EnumToArrayPipeModule } from 'app/enum-to-array';

import { RecursoComponent, routedComponents, routes } from './recurso-routing.module';

describe('RecursoComponent', () => {
  let outletComponent: RecursoComponent;
  let outletFixture: ComponentFixture<RecursoComponent>;

  let router: Router;
  let location: Location;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
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
        BrowserAnimationsModule,

        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [...routedComponents],
    })
      .compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    outletFixture = TestBed.createComponent(RecursoComponent);
    outletComponent = outletFixture.componentInstance;
    router.initialNavigation();
  }));

  it('should navigate to /list', fakeAsync(() => {
    router.navigate(['list']);
    tick(50);
    expect(location.path()).toBe('/list');
  }));

  it('should redirect "" to /list', fakeAsync(() => {
    router.navigate(['']);
    tick(50);
    expect(location.path()).toBe('/list');
  }));

  it('should redirect "/edit/" to "/edit/new"', fakeAsync(() => {
    router.navigate(['edit']);
    tick(50);
    expect(location.path()).toBe('/edit/new');
  }));
});
