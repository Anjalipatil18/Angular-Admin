import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypedetailsDialogComponent } from './typedetails-dialog.component';

describe('TypedetailsDialogComponent', () => {
  let component: TypedetailsDialogComponent;
  let fixture: ComponentFixture<TypedetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypedetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypedetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
