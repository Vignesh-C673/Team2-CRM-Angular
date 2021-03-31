import { TestBed } from '@angular/core/testing';

import { CourseserviceService } from './courseservice.service';

describe('CourseserviceService', () => {
  let service: CourseserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
