import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsCategoryComponent } from './agents-category.component';

describe('AgentsCategoryComponent', () => {
  let component: AgentsCategoryComponent;
  let fixture: ComponentFixture<AgentsCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentsCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
