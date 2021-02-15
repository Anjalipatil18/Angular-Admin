import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionPlanAddComponent } from './promotion-plan-add.component';

describe('PromotionPlanAddComponent', () => {
  let component: PromotionPlanAddComponent;
  let fixture: ComponentFixture<PromotionPlanAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionPlanAddComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionPlanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
