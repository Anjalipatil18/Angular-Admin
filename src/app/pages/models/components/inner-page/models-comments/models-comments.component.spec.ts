import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsCommentsComponent } from './models-comments.component';

describe('ModelsCommentsComponent', () => {
  let component: ModelsCommentsComponent;
  let fixture: ComponentFixture<ModelsCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
