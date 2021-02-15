import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUsersSellerDialogComponent } from './newuserseller-dialog.component';

describe('NewUsersSellerDialogComponent', () => {
  let component: NewUsersSellerDialogComponent;
  let fixture: ComponentFixture<NewUsersSellerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUsersSellerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUsersSellerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
