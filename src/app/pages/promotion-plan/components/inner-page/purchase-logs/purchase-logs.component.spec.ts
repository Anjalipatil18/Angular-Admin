import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseLogsPlansComponent } from './purchase-logs.component';

describe('PurchaseLogsPlansComponent', () => {
  let component: PurchaseLogsPlansComponent;
  let fixture: ComponentFixture<PurchaseLogsPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseLogsPlansComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseLogsPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
