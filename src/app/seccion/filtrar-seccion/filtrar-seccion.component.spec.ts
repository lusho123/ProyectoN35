import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrarSeccionComponent } from './filtrar-seccion.component';

describe('FiltrarSeccionComponent', () => {
  let component: FiltrarSeccionComponent;
  let fixture: ComponentFixture<FiltrarSeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrarSeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrarSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
