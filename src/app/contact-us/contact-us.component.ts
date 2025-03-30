import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent implements OnInit {
  fg: FormGroup | undefined;

  @ViewChild('contactUsForm')
  contactUsForm!: ElementRef;

  
  constructor(private builder: FormBuilder, private appService: AppService) {}

  ngOnInit() {
    this.fg = this.builder.group({
      name: new FormControl('', []),
      email: new FormControl('', [Validators.required, Validators.email]),
      comment: new FormControl('', [Validators.required]),
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
}
