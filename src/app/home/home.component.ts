import { ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AppService } from '../services/app.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnDestroy, OnInit {

  private readonly destroy$: Subject<any>;
  config: any;

  fg: FormGroup | undefined;

  @ViewChild('homeForm')
  homeForm!: ElementRef;

  isSubmitted: boolean = false;

  
  constructor(private builder: FormBuilder, private appService: AppService, private cdref: ChangeDetectorRef) {
    this.destroy$ = new Subject<any>();
    this.config = this.appService.getConfig();
  }

  ngOnInit() {
    this.fg = this.builder.group({
      phone: new FormControl('', []),
      email: new FormControl('', [Validators.email]),
    }, { validator: atLeastOne('phone','email') },);
  }

  onSubmit(data: any) {
    console.log('fg:: ', this.fg);
    console.log(!data.email && !data.phone);
    this.fg?.markAllAsTouched();

    console.log('this.fg.valid ', this.fg?.valid);
    console.log('this.fg.hasError ', this.fg?.hasError('atLeastOne'));
    console.log('home.component->onSubmit(), data:: ', data);
    
    if (!this.fg?.valid) {
      this.homeForm.nativeElement.classList.add('was-validated');
    } else {
      this.isSubmitted = true;
      this.appService.joinWaitingList(data).subscribe();;
      this.homeForm.nativeElement.submit();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}

export function atLeastOne(...fields: string[]) {
  return (fg: FormGroup, ): ValidationErrors | null => {
    return fields.some(fieldName => {
      const field = fg?.get(fieldName)?.value;
      // return field && field.length > 0 ? true : false;
      // if (typeof field === 'string') return field && field.length > 0 ? true : false;
      if (typeof field === 'number') return field && field >= 0 ? true : false;
      if (typeof field === 'string') return field && field.length > 0 ? true : false;
      return true;
    })
      ? null
      : ({ atLeastOne: 'At least one field has to be provided.' } as ValidationErrors);
  };
}
