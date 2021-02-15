import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsAddComponent } from './models-add.component';

describe('ModelsAddComponent', () => {
  let component: ModelsAddComponent;
  let fixture: ComponentFixture<ModelsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
