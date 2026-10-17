import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConsultas } from './admin-consultas';

describe('AdminConsultas', () => {
  let component: AdminConsultas;
  let fixture: ComponentFixture<AdminConsultas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminConsultas],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminConsultas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
