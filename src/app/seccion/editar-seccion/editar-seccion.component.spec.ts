import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSeccionComponent } from './editar-seccion.component';

describe('EditarSeccionComponent', () => {
  let component: EditarSeccionComponent;
  let fixture: ComponentFixture<EditarSeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarSeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
