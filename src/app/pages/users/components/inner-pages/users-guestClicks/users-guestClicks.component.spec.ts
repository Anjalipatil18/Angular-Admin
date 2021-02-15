import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersGuestClicksComponent } from './users-guestClicks.component';

describe('UsersGuestClicksComponent', () => {
  let component: UsersGuestClicksComponent;
  let fixture: ComponentFixture<UsersGuestClicksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersGuestClicksComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersGuestClicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
