import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedColorsComponent } from './deleted-colors.component';

describe('DeletedColorsComponent', () => {
  let component: DeletedColorsComponent;
  let fixture: ComponentFixture<DeletedColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedColorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
