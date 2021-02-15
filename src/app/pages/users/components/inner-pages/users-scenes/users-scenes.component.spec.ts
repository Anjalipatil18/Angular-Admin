import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersScenesComponent } from './users-scenes.component';

describe('UsersScenesComponent', () => {
  let component: UsersScenesComponent;
  let fixture: ComponentFixture<UsersScenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersScenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersScenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
