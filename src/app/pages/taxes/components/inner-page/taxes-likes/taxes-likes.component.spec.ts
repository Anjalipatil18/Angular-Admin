import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesLikesComponent } from './taxes-likes.component';

describe('TaxesLikesComponent', () => {
  let component: TaxesLikesComponent;
  let fixture: ComponentFixture<TaxesLikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxesLikesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxesLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
