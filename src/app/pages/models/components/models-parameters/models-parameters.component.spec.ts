import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelsParametersComponent } from './models-parameters.component';

describe('ModelsParametersComponent', () => {
  let component: ModelsParametersComponent;
  let fixture: ComponentFixture<ModelsParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
