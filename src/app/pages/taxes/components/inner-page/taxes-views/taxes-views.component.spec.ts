import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesViewsComponent } from './taxes-views.component';

describe('TaxesViewsComponent', () => {
  let component: TaxesViewsComponent;
  let fixture: ComponentFixture<TaxesViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxesViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxesViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
