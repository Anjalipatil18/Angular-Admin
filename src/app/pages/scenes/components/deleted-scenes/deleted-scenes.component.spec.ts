import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedScenesComponent } from './deleted-scenes.component';

describe('DeletedScenesComponent', () => {
  let component: DeletedScenesComponent;
  let fixture: ComponentFixture<DeletedScenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedScenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedScenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
