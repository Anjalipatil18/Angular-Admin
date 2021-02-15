import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTagReasonsComponent } from './report-tag-reasons.component';

describe('ReportTagReasonsComponent', () => {
  let component: ReportTagReasonsComponent;
  let fixture: ComponentFixture<ReportTagReasonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTagReasonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTagReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
