import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { PredictComponent } from './predict.component';

describe('PredictComponent', () => {
  let component: PredictComponent;
  let fixture: ComponentFixture<PredictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PredictComponent, // ✅ car c'est un composant standalone
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PredictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
