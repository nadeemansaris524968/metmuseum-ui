import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmResultItemComponent } from './mm-result-item.component';

describe('MmResultItemComponent', () => {
  let component: MmResultItemComponent;
  let fixture: ComponentFixture<MmResultItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MmResultItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmResultItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
