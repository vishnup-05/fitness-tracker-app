import com.example.fitnessapp.model.Workout;
import com.example.fitnessapp.model.User;
import com.example.fitnessapp.repository.WorkoutRepository;
import com.example.fitnessapp.repository.UserRepository;
import com.example.fitnessapp.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private UserRepository userRepository; // Keep this for now to fetch the User object

    @Autowired
    private WorkoutService workoutService;

    @GetMapping
    public List<Workout> getAllWorkouts() {
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        User currentUser = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        return workoutRepository.findByUserId(currentUser.getId());
    }

    @PostMapping
    public Workout createWorkout(@RequestBody Workout workout) {
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        User currentUser = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        workout.setUser(currentUser);
        return workoutService.createWorkout(workout);
    }

    @PutMapping("/{id}")
    public Workout updateWorkout(@PathVariable Long id, @RequestBody Workout workout) {
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        User currentUser = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        if (!workoutRepository.findById(id).orElseThrow(() -> new RuntimeException("Workout not found")).getUser().equals(currentUser)) {
            throw new RuntimeException("Unauthorized");
        }
        return workoutService.updateWorkout(id, workout);
    }

    @DeleteMapping("/{id}")
    public void deleteWorkout(@PathVariable Long id) {
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        User currentUser = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        if (!workoutRepository.findById(id).orElseThrow(() -> new RuntimeException("Workout not found")).getUser().equals(currentUser)) {
            throw new RuntimeException("Unauthorized");
        }
        workoutService.deleteWorkout(id);
    }
}
