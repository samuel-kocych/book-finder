import { TestBed } from '@angular/core/testing';

import { FavoriteBookApiService } from './favorite-book-api.service';

describe('FavoriteBookApiService', () => {
  let service: FavoriteBookApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteBookApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
