import { TestBed } from '@angular/core/testing';

import { Destinos } from './destinos';

describe('Destinos', () => {
  let service: Destinos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Destinos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
