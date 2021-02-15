import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsUpdatecategoryComponent } from './agents-updatecategory.component';

describe('AgentsUpdatecategoryComponent', () => {
  let component: AgentsUpdatecategoryComponent;
  let fixture: ComponentFixture<AgentsUpdatecategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentsUpdatecategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentsUpdatecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
