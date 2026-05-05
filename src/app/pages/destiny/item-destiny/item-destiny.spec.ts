import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDestiny } from './item-destiny';

describe('ItemDestiny', () => {
  let component: ItemDestiny;
  let fixture: ComponentFixture<ItemDestiny>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDestiny],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemDestiny);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
