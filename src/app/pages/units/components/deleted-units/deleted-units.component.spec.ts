import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedUnitsComponent } from './deleted-units.component';

describe('DeletedUnitsComponent', () => {
  let component: DeletedUnitsComponent;
  let fixture: ComponentFixture<DeletedUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
