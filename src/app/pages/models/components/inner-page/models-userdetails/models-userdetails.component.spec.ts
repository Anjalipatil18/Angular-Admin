import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsUserdetailsComponent } from './models-userdetails.component';

describe('ModelsUserdetailsComponent', () => {
  let component: ModelsUserdetailsComponent;
  let fixture: ComponentFixture<ModelsUserdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsUserdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsUserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
