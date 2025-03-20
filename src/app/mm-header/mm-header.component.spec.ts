import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmHeaderComponent } from './mm-header.component';

describe('HeaderComponent', () => {
  let component: MmHeaderComponent;
  let fixture: ComponentFixture<MmHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MmHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MmHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
