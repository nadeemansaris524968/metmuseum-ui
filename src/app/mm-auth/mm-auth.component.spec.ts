import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmAuthComponent } from './mm-auth.component';

describe('MmAuthComponent', () => {
  let component: MmAuthComponent;
  let fixture: ComponentFixture<MmAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MmAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
