import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotorsUserClicksComponent } from './promotors-userClicks.component';

describe('PromotorsUserClicksComponent', () => {
  let component: PromotorsUserClicksComponent;
  let fixture: ComponentFixture<PromotorsUserClicksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PromotorsUserClicksComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotorsUserClicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
