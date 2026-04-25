import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Destiny } from './destiny';

describe('Destiny', () => {
  let component: Destiny;
  let fixture: ComponentFixture<Destiny>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Destiny],
    }).compileComponents();

    fixture = TestBed.createComponent(Destiny);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
