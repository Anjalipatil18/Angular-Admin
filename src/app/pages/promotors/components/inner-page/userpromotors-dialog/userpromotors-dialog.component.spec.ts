import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpromotorsDialogComponent } from './userpromotors-dialog.component';

describe('UserpromotorsDialogComponent', () => {
  let component: UserpromotorsDialogComponent;
  let fixture: ComponentFixture<UserpromotorsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpromotorsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpromotorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
