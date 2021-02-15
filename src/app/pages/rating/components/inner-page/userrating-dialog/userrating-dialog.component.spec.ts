import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserratingDialogComponent } from './userrating-dialog.component';

describe('UserratingDialogComponent', () => {
  let component: UserratingDialogComponent;
  let fixture: ComponentFixture<UserratingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserratingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserratingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
