import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePicker } from './date-picker.component';
import { TranslateModule } from '@ngx-translate/core'; 

describe('DatePickerComponent', () => {
  let component: DatePicker;
  let fixture: ComponentFixture<DatePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DatePicker,
        TranslateModule.forRoot()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an input[type="date"] element', () => {
    const datePickerElement: HTMLInputElement = fixture.nativeElement.querySelector('input[type="date"]');
    expect(datePickerElement).toBeTruthy();
  });
});
