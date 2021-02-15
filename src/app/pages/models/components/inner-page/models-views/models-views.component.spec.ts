import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsViewsComponent } from './models-views.component';

describe('ModelsViewsComponent', () => {
  let component: ModelsViewsComponent;
  let fixture: ComponentFixture<ModelsViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
