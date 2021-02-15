import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedGroupComponent } from './deleted-group.component';

describe('DeletedGroupComponent', () => {
  let component: DeletedGroupComponent;
  let fixture: ComponentFixture<DeletedGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
