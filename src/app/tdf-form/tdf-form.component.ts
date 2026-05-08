import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../user';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-tdf-form',
  standalone: true,
  imports: [FormsModule, NgbModule],
  templateUrl: './tdf-form.component.html',
  styleUrl: './tdf-form.component.css',
})
export class TdfFormComponent {
  userObject: User = {};

  selectedCourse = '';

  options = ['Angular', 'React', 'Vue'];

  input$ = new Subject<string>();

  searchCourse$ = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term === ''
          ? this.options
          : this.options.filter((option) =>
              option.toLowerCase().includes(term.toLowerCase()),
            ),
      ),
    );

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedCourse = input.value;
    this.input$.next(input.value);
  }

  setValue(userForm: NgForm) {
    console.log('setValue called');
    userForm.setValue({
      firstName: 'aaa',
      lastName: 'bbb',
      email: 'eeee@gmail.com',
      pass: '123dddf',
      isCheck: true,
    });
  }

  patchValue(userForm: NgForm) {
    // Note: patchValue allows you to update only specific fields of the form, while setValue requires you to provide values for all fields.
    console.log('patchValue called');
    userForm.control.patchValue({
      firstName: 'aaa',
      lastName: 'bbb',
      email: 'eaa@gmail.com',
      pass: '123dddf',
    });
  }

  onSubmit(userForm: NgForm) {
    console.log('Form Submitted');
    console.log(userForm.value);
    this.userObject = userForm.value;
  }
}
