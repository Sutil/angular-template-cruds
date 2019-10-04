import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprovacaoComponent } from './aprovacao.component';

describe('AprovacaoComponent', () => {
  let component: AprovacaoComponent;
  let fixture: ComponentFixture<AprovacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprovacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprovacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
