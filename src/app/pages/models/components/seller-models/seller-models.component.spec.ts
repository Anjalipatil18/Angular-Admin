import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerModelsComponent } from './seller-models.component';

describe('SellerModelsComponent', () => {
  let component: SellerModelsComponent;
  let fixture: ComponentFixture<SellerModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
