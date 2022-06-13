import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MybenefitsComponent } from './mybenefits.component';

describe('MybenefitsComponent', () => {
  let component: MybenefitsComponent;
  let fixture: ComponentFixture<MybenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MybenefitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MybenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
