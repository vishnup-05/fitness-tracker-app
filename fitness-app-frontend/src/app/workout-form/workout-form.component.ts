import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { WorkoutService } from '../workout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Workout } from '../workout.model';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class WorkoutFormComponent implements OnInit {
  workoutForm: FormGroup;
  isEditMode: boolean = false;
  workoutId: number | null = null;

  constructor(private fb: FormBuilder, private workoutService: WorkoutService, private router: Router, private route: ActivatedRoute) {
    this.workoutForm = this.fb.group({
      exercise: ['', Validators.required],
      sets: ['', [Validators.required, Validators.min(1)]],
      reps: ['', [Validators.required, Validators.min(1)]],
      duration: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.workoutId = +id;
        this.workoutService.getWorkoutById(this.workoutId).subscribe(workout => {
          this.workoutForm.patchValue(workout);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.workoutForm.valid) {
      if (this.isEditMode && this.workoutId !== null) {
        const updatedWorkout: Workout = { id: this.workoutId, ...this.workoutForm.value };
        this.workoutService.updateWorkout(updatedWorkout).subscribe(() => {
          this.router.navigate(['/workouts']);
        });
      } else {
        this.workoutService.addWorkout(this.workoutForm.value).subscribe(() => {
          this.router.navigate(['/workouts']);
        });
      }
    }
  }
}
