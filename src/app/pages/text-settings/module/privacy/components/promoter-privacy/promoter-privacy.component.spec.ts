import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterPrivacyComponent } from './promoter-privacy.component';

describe('PromoterPrivacyComponent', () => {
  let component: PromoterPrivacyComponent;
  let fixture: ComponentFixture<PromoterPrivacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoterPrivacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoterPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
