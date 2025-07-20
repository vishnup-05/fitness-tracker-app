import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class RegisterComponent {
  user = {
    username: '',
    password: '',
    email: '',
    age: null,
    weight: null,
    fitnessGoals: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    this.authService.register(this.user).subscribe(
      () => {
        alert('Registration successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration failed', error);
        // Handle registration error
      }
    );
  }
}
