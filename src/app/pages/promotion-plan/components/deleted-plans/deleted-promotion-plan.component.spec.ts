import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedPromotionPlanComponent } from './deleted-promotion-plan.component';

describe('DeletedPromotionPlanComponent', () => {
  let component: DeletedPromotionPlanComponent;
  let fixture: ComponentFixture<DeletedPromotionPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeletedPromotionPlanComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedPromotionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
