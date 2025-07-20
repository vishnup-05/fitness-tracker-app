import { Routes } from '@angular/router';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'workouts', component: WorkoutListComponent, canActivate: [AuthGuard] },
  { path: 'add-workout', component: WorkoutFormComponent, canActivate: [AuthGuard] },
  { path: 'add-workout/:id', component: WorkoutFormComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/workouts', pathMatch: 'full' },
  { path: '**', redirectTo: '/workouts' } // Wildcard route for any unmatched URL
];