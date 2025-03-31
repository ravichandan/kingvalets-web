import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  private readonly destroy$: Subject<any>;
  config: any;

  fg: FormGroup | undefined;

  @ViewChild('contactUsForm')
  contactUsForm!: ElementRef;

  
  constructor(private builder: FormBuilder, private appService: AppService) {
    this.destroy$ = new Subject<any>();
    this.config = this.appService.getConfig();
  }

  ngOnInit() {
    this.fg = this.builder.group({
      phone: new FormControl('', []),
      email: new FormControl('', [Validators.required, Validators.email]),
      // comment: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(data: any) {
    console.log('fg:: ', this.fg);
    console.log('contact-us.component->onSubmit(), data:: ', data);
    if (!this.fg?.valid) {
      this.contactUsForm.nativeElement.classList.add('was-validated');
    } else {
      this.appService.joinWaitingList({}).subscribe();;
      // this.contactUsForm.nativeElement.submit();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
