import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TdfFormComponent } from './tdf-form/tdf-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, TdfFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Training Angular 19';
}
