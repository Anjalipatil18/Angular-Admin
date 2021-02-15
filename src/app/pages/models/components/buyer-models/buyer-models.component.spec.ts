import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerModelsComponent } from './buyer-models.component';

describe('BuyerModelsComponent', () => {
  let component: BuyerModelsComponent;
  let fixture: ComponentFixture<BuyerModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
