const express = require("express");
const workoutController = require("../controllers/workout");
const { verify } = require("../auth");

const router = express.Router();

// Route for Creating Workout
router.post("/addWorkout", verify, workoutController.addWorkout);

// Get All Workouts
router.get("/getMyWorkouts", verify, workoutController.getAllWorkouts);

// Update Workout
router.patch("/updateWorkout/:id", verify, workoutController.updateWorkout);

// Delete Workout
router.delete("/deleteWorkout/:id", verify, workoutController.deleteWorkout);

// Complete Workout
router.patch("/completeWorkoutStatus/:id", verify, workoutController.completeWorkout);

module.exports = router;