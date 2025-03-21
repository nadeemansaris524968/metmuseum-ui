import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtItemComponent } from './art-item.component';

describe('MmResultItemComponent', () => {
  let component: ArtItemComponent;
  let fixture: ComponentFixture<ArtItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
