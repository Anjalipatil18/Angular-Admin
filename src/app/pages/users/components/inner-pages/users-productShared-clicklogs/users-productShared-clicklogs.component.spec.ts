import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersProductSharedClickLogsComponent } from './users-productShared-clicklogs.component';

describe('UsersProductSharedClickLogsComponent', () => {
  let component: UsersProductSharedClickLogsComponent;
  let fixture: ComponentFixture<UsersProductSharedClickLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersProductSharedClickLogsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersProductSharedClickLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
