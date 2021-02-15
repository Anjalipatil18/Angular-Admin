import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionPlanComponent } from './promotion-plan.component';

describe('PromotionPlanComponent', () => {
  let component: PromotionPlanComponent;
  let fixture: ComponentFixture<PromotionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionPlanComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
