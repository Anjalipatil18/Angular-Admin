import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercolorsDialogComponent } from './usercolors-dialog.component';

describe('UsercolorsDialogComponent', () => {
  let component: UsercolorsDialogComponent;
  let fixture: ComponentFixture<UsercolorsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercolorsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercolorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
