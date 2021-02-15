import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedPromotorsComponent } from './reported-promotors.component';

describe('ReportedPromotorsComponent', () => {
  let component: ReportedPromotorsComponent;
  let fixture: ComponentFixture<ReportedPromotorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportedPromotorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportedPromotorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
