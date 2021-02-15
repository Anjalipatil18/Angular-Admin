import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotorsGuestClicksComponent } from './promotors-guestClicks.component';

describe('PromotorsGuestClicksComponent', () => {
  let component: PromotorsGuestClicksComponent;
  let fixture: ComponentFixture<PromotorsGuestClicksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PromotorsGuestClicksComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotorsGuestClicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
