import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFollowComponent } from './users-follow.component';

describe('UsersFollowComponent', () => {
  let component: UsersFollowComponent;
  let fixture: ComponentFixture<UsersFollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersFollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
