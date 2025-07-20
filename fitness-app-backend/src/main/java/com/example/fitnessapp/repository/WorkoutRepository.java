package com.example.fitnessapp.repository;

import com.example.fitnessapp.model.Workout;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findByUserId(Long userId);
}
