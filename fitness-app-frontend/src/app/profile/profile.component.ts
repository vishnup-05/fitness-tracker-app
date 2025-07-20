import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
  }

  updateProfile(): void {
    this.authService.updateUserProfile(this.user).subscribe(
      (data) => {
        alert('Profile updated successfully!');
        this.user = data;
      },
      (error) => {
        console.error('Error updating user profile', error);
        alert('Failed to update profile.');
      }
    );
  }
}
