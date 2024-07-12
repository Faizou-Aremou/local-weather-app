import { TestBed } from '@angular/core/testing';

import { PostalCodeServiceService } from './postal-code-service.service';

describe('PostalCodeServiceService', () => {
  let service: PostalCodeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostalCodeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
