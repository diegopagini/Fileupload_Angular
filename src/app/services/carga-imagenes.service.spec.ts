import { TestBed } from '@angular/core/testing';

import { CargaImagenesService } from './carga-imagenes.service';

describe('CargaImagenesService', () => {
  let service: CargaImagenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaImagenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
