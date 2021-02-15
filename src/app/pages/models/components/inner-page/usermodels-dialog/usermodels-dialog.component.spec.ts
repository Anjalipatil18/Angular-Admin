import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermodelsDialogComponent } from './usermodels-dialog.component';

describe('UsermodelsDialogComponent', () => {
  let component: UsermodelsDialogComponent;
  let fixture: ComponentFixture<UsermodelsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsermodelsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermodelsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
