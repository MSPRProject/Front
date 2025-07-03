import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { PredictComponent } from './predict.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
=======
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { PredictComponent } from './predict.component';
>>>>>>> 074fa08 (ajout_predic_test_ok_commencement_playrwright)

describe('PredictComponent', () => {
  let component: PredictComponent;
  let fixture: ComponentFixture<PredictComponent>;

<<<<<<< HEAD

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PredictComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
=======
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PredictComponent, // ✅ car c'est un composant standalone
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ]
>>>>>>> 074fa08 (ajout_predic_test_ok_commencement_playrwright)
    }).compileComponents();

    fixture = TestBed.createComponent(PredictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
<<<<<<< HEAD

  it('should render element with class "predict"', () => {
    const predictElement = fixture.nativeElement.querySelector('.predict');
    expect(predictElement).toBeTruthy();
  });
=======
>>>>>>> 074fa08 (ajout_predic_test_ok_commencement_playrwright)
});
