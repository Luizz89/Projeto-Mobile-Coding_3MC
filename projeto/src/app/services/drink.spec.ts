import { TestBed } from '@angular/core/testing';

import { Drink } from './drink';

describe('Drink', () => {
  let service: Drink;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Drink);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
