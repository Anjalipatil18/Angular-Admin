import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertagsDialogComponent } from './usertags-dialog.component';

describe('UsertagsDialogComponent', () => {
  let component: UsertagsDialogComponent;
  let fixture: ComponentFixture<UsertagsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertagsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertagsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
