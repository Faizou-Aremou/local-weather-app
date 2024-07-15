import { TestBed } from '@angular/core/testing';

import { PostalCodeAPIService } from './postal-code-api.service';

describe('PostalCodeAPIService', () => {
  let service: PostalCodeAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostalCodeAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
