import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedColorsComponent } from './reported-colors.component';

describe('ReportedColorsComponent', () => {
  let component: ReportedColorsComponent;
  let fixture: ComponentFixture<ReportedColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportedColorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportedColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
