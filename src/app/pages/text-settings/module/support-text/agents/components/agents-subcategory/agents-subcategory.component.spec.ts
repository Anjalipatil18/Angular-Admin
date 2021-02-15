import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsSubcategoryComponent } from './agents-subcategory.component';

describe('AgentsSubcategoryComponent', () => {
  let component: AgentsSubcategoryComponent;
  let fixture: ComponentFixture<AgentsSubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentsSubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentsSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
