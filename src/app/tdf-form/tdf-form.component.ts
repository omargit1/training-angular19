import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-tdf-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tdf-form.component.html',
  styleUrl: './tdf-form.component.css',
})
export class TdfFormComponent {
  userObject: User = {};

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

      pass: '123dddf',
      isCheck: true,
    });
  }

  onSubmit(userForm: NgForm) {
    console.log('Form Submitted');
    console.log(userForm.value);
    this.userObject = userForm.value;
  }
}
