import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUserReasonsComponent } from './report-user-reasons.component';

describe('ReportUserReasonsComponent', () => {
  let component: ReportUserReasonsComponent;
  let fixture: ComponentFixture<ReportUserReasonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportUserReasonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportUserReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
