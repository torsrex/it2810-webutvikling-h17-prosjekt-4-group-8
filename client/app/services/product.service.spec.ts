import { TestBed, inject } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpModule } from '@angular/http';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));
});
