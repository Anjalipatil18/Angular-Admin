import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedTaxesComponent } from './reported-taxes.component';

describe('ReportedTaxesComponent', () => {
  let component: ReportedTaxesComponent;
  let fixture: ComponentFixture<ReportedTaxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportedTaxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportedTaxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
