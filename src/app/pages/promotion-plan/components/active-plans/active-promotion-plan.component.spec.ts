import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePromotionPlanComponent } from './active-promotion-plan.component';

describe('ActivePromotionPlanComponent', () => {
  let component: ActivePromotionPlanComponent;
  let fixture: ComponentFixture<ActivePromotionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivePromotionPlanComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePromotionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
