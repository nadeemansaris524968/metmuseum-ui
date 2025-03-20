import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmResultListComponent } from './mm-result-list.component';

describe('MmResultListComponent', () => {
  let component: MmResultListComponent;
  let fixture: ComponentFixture<MmResultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MmResultListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
