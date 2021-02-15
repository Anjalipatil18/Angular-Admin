import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendedTaxesComponent } from './suspended-taxes.component';

describe('SuspendedTaxesComponent', () => {
  let component: SuspendedTaxesComponent;
  let fixture: ComponentFixture<SuspendedTaxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspendedTaxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspendedTaxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
