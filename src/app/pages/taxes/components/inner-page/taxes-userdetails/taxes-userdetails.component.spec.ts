import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesUserdetailsComponent } from './taxes-userdetails.component';

describe('TaxesUserdetailsComponent', () => {
  let component: TaxesUserdetailsComponent;
  let fixture: ComponentFixture<TaxesUserdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxesUserdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxesUserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
