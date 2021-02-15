import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotorsViewsComponent } from './promotors-views.component';

describe('PromotorsViewsComponent', () => {
  let component: PromotorsViewsComponent;
  let fixture: ComponentFixture<PromotorsViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotorsViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotorsViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
