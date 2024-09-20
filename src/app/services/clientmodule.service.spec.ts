import { TestBed } from '@angular/core/testing';

import { ClientmoduleService } from './clientmodule.service';

describe('ClientmoduleService', () => {
  let service: ClientmoduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientmoduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
