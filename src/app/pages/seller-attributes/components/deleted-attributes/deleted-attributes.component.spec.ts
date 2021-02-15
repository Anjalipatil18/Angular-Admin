import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedAttributesComponent } from './deleted-attributes.component';

describe('DeletedAttributesComponent', () => {
  let component: DeletedAttributesComponent;
  let fixture: ComponentFixture<DeletedAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
