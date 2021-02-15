import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertaxesDialogComponent } from './usertaxes-dialog.component';

describe('UsertaxesDialogComponent', () => {
  let component: UsertaxesDialogComponent;
  let fixture: ComponentFixture<UsertaxesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertaxesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertaxesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
