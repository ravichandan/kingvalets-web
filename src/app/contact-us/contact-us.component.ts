import { ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AppService } from '../services/app.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent implements OnDestroy, OnInit {

  isRequired(arg0: AbstractControl<any,any>) {
    console.log('isRequired');
    arg0.hasValidator(Validators.required);
  }

  private readonly destroy$: Subject<any>;
  config: any;

  fg: FormGroup | undefined;

  @ViewChild('contactUsForm')
  contactUsForm!: ElementRef;

  isSubmitted: boolean = false;

  
  constructor(private builder: FormBuilder, private appService: AppService, private cdref: ChangeDetectorRef) {
    this.destroy$ = new Subject<any>();
    this.config = this.appService.getConfig();
  }

  ngOnInit() {
    this.fg = this.builder.group({
      phone: new FormControl('', []),
      email: new FormControl('', [Validators.email]),
      // comment: new FormControl('', [Validators.required]),
    }, { validator: atLeastOne('phone','email') },);
  }

  onSubmit(data: any) {
    console.log('fg:: ', this.fg);
    console.log(!data.email && !data.phone);
    // if(!data.email && !data.phone){
    //   this.fg?.controls['phone'].addValidators(Validators.required);
    //   this.fg?.controls['email'].addValidators(Validators.required);
    // } else {
    //   this.fg?.controls['phone'].removeValidators(Validators.required);
    //   this.fg?.controls['email'].removeValidators(Validators.required);
    // }
    // this.fg?.controls['phone'].updateValueAndValidity();
    // this.fg?.controls['email'].updateValueAndValidity();

    // this.fg?.controls['email'].markAsTouched();
    // this.fg?.controls['phone'].markAsTouched();
    // this.fg?.updateValueAndValidity();
    // this.cdref.detectChanges();
    console.log('this.fg.valid ', this.fg?.valid);
    console.log('this.fg.hasError ', this.fg?.hasError('atLeastOne'));
    console.log('contact-us.component->onSubmit(), data:: ', data);
    if (!this.fg?.valid) {
      this.contactUsForm.nativeElement.classList.add('was-validated');
    } else {
      this.isSubmitted = true;
      // this.appService.joinWaitingList(data).subscribe();;
      // this.contactUsForm.nativeElement.submit();
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
