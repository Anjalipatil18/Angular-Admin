import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewModelsComponent } from './review-models.component';

describe('ReviewModelsComponent', () => {
  let component: ReviewModelsComponent;
  let fixture: ComponentFixture<ReviewModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
