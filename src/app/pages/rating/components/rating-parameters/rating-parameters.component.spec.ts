import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingParametersComponent } from './rating-parameters.component';

describe('RatingParametersComponent', () => {
  let component: RatingParametersComponent;
  let fixture: ComponentFixture<RatingParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
