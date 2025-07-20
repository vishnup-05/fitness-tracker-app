import { Component, OnInit } from '@angular/core';
import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = [];
  totalWorkouts: number = 0;
  totalDuration: number = 0;
  averageDuration: number = 0;

  constructor(private workoutService: WorkoutService, private router: Router) { }

  ngOnInit(): void {
    this.loadWorkouts();
  }

  loadWorkouts(): void {
    this.workoutService.getWorkouts().subscribe(workouts => {
      this.workouts = workouts;
      this.calculateStatistics();
    });
  }

  calculateStatistics(): void {
    this.totalWorkouts = this.workouts.length;
    this.totalDuration = this.workouts.reduce((sum, workout) => sum + workout.duration, 0);
    this.averageDuration = this.totalWorkouts > 0 ? this.totalDuration / this.totalWorkouts : 0;
  }

  editWorkout(workout: Workout): void {
    this.router.navigate(['/add-workout', workout.id]);
  }

  deleteWorkout(id: number | undefined): void {
    if (id !== undefined) {
      this.workoutService.deleteWorkout(id).subscribe(() => {
        this.loadWorkouts();
      });
    }
  }
}
