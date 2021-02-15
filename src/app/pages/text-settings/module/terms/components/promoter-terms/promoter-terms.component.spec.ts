import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterTermsComponent } from './promoter-terms.component';

describe('PromoterTermsComponent', () => {
  let component: PromoterTermsComponent;
  let fixture: ComponentFixture<PromoterTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoterTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoterTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
