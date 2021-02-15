import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteBannerTabComponent } from './website-banners.component';

describe('WebsiteBannerTabComponent', () => {
  let component: WebsiteBannerTabComponent;
  let fixture: ComponentFixture<WebsiteBannerTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebsiteBannerTabComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteBannerTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
