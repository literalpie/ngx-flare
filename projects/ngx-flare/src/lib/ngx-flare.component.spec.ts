import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFlareComponent } from './ngx-flare.component';

describe('NgxFlareComponent', () => {
  let component: NgxFlareComponent;
  let fixture: ComponentFixture<NgxFlareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFlareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFlareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
