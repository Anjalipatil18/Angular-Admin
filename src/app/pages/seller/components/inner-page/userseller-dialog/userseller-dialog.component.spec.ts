import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersellerDialogComponent } from './userseller-dialog.component';

describe('UsersellerDialogComponent', () => {
  let component: UsersellerDialogComponent;
  let fixture: ComponentFixture<UsersellerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersellerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersellerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
