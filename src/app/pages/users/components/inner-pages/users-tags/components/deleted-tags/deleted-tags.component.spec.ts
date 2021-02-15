import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedTagsComponent } from './deleted-tags.component';

describe('DeletedTagsComponent', () => {
  let component: DeletedTagsComponent;
  let fixture: ComponentFixture<DeletedTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
