import { TestBed } from '@angular/core/testing';

import { ImcServiceService } from './imc-service.service';

describe('ImcServiceService', () => {
  let service: ImcServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImcServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
