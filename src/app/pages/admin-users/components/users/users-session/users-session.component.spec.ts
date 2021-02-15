import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSessionComponent } from './users-session.component';

describe('UsersSessionComponent', () => {
  let component: UsersSessionComponent;
  let fixture: ComponentFixture<UsersSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
