import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdetailsDialogComponent } from './userdetails-dialog.component';

describe('UserdetailsDialogComponent', () => {
  let component: UserdetailsDialogComponent;
  let fixture: ComponentFixture<UserdetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
