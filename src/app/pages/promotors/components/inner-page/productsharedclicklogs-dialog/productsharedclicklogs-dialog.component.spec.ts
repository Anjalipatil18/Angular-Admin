import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSharedClickLogsDialogComponent } from './productsharedclicklogs-dialog.component';

describe('ProductSharedClickLogsDialogComponent', () => {
  let component: ProductSharedClickLogsDialogComponent;
  let fixture: ComponentFixture<ProductSharedClickLogsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductSharedClickLogsDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSharedClickLogsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
