import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedTaxesComponent } from './deleted-taxes.component';

describe('DeletedTaxesComponent', () => {
  let component: DeletedTaxesComponent;
  let fixture: ComponentFixture<DeletedTaxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedTaxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedTaxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
