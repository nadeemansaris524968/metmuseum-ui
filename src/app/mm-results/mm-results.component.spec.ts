import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmResultsComponent } from './mm-results.component';

describe('MmResultsComponent', () => {
  let component: MmResultsComponent;
  let fixture: ComponentFixture<MmResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MmResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
