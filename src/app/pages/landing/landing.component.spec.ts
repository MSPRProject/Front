import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LandingComponent } from './landing.component';
import { TranslateModule } from '@ngx-translate/core';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LandingComponent,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render element with class "landing"', () => {
    const landingElement = fixture.nativeElement.querySelector('.landing');
    expect(landingElement).toBeTruthy();
  });
});
