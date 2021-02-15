import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSceneReasonsComponent } from './report-scene-reasons.component';

describe('ReportSceneReasonsComponent', () => {
  let component: ReportSceneReasonsComponent;
  let fixture: ComponentFixture<ReportSceneReasonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSceneReasonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSceneReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
