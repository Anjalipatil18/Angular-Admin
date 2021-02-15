import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivatedTaxesComponent } from './deactivated-taxes.component';

describe('DeactivatedTaxesComponent', () => {
  let component: DeactivatedTaxesComponent;
  let fixture: ComponentFixture<DeactivatedTaxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivatedTaxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivatedTaxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
