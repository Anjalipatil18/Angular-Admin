import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedPromotorsComponent } from './deleted-promotors.component';

describe('DeletedPromotorsComponent', () => {
  let component: DeletedPromotorsComponent;
  let fixture: ComponentFixture<DeletedPromotorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedPromotorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedPromotorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
