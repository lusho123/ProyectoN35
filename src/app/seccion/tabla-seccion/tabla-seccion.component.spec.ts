import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSeccionComponent } from './tabla-seccion.component';

describe('TablaSeccionComponent', () => {
  let component: TablaSeccionComponent;
  let fixture: ComponentFixture<TablaSeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaSeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
