import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUsersPromotorsDialogComponent } from './newuserspromotor-dialog.component';

describe('NewUsersPromotorsDialogComponent', () => {
  let component: NewUsersPromotorsDialogComponent;
  let fixture: ComponentFixture<NewUsersPromotorsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUsersPromotorsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUsersPromotorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
