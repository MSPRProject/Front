import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PredictComponent } from './predict.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // <-- Import

describe('PredictComponent', () => {
  let component: PredictComponent;
  let fixture: ComponentFixture<PredictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PredictComponent,
        HttpClientTestingModule 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render element with class "predict"', () => {
    const predictElement = fixture.nativeElement.querySelector('.predict');
    expect(predictElement).toBeTruthy();
  });
});
