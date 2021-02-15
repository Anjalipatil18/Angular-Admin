import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersUserClicks } from './users-userClicks.component';

describe('UsersUserClicks', () => {
  let component: UsersUserClicks;
  let fixture: ComponentFixture<UsersUserClicks>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersUserClicks ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersUserClicks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
