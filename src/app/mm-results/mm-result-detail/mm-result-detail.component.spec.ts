import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmResultDetailComponent } from './mm-result-detail.component';

describe('MmResultDetailComponent', () => {
  let component: MmResultDetailComponent;
  let fixture: ComponentFixture<MmResultDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MmResultDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmResultDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
