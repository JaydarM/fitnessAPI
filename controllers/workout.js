const Workout = require("../models/Workout");
const { errorHandler } = require("../auth");

// Create Workouts
module.exports.addWorkout = async (req, res) => {

	try {

		let newWorkout = await new Workout({
			userId: req.user.id,
			name: req.body.name,
			duration: req.body.duration
		})

		await newWorkout.save();
		res.status(201).json(newWorkout);

	} catch(error) {errorHandler(error, req, res)}

}

// Get All Workouts
module.exports.getAllWorkouts = async (req, res) => {

	try {

		const workouts = await Workout.find({userId: req.user.id});
		if (workouts.length === 0) {
			res.status(404).json({message: "No workouts found"});
		}

		res.status(200).json({workouts: workouts});

	} catch(error) {errorHandler(error, req, res)}

}

// Update Workout
module.exports.updateWorkout = async (req, res) => {

	try {

		const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, {new: true});
		if (updatedWorkout === null) {
			res.status(404).json({message: "Workout not found"});
		}

		res.status(200).json({
			message: "Workout updated successfully",
			updatedWorkout: updatedWorkout
		})

	} catch(error) {errorHandler(error, req, res)}

}

// Delete Workout
module.exports.deleteWorkout = async (req, res) => {

	try {

		const deletedWorkout = await Workout.deleteOne({_id: req.params.id});
		if (deletedWorkout < 1) {
			res.status(400).json({error: "No workout deleted"});
		}

		res.status(200).json({message: "Workout deleted successfully"});

	} catch(error) {errorHandler(error, req, res)}

}

// Complete Workout
module.exports.completeWorkout = async (req, res) => {

	try {

		const workout = await Workout.findById(req.params.id);
		if (workout === null) {
			res.status(404).json({message: "Workout not found"});
		}

		if (workout.status === "completed") {
			res.status(200).json({message: "Workout already completed."})
		}

		const completedWorkout = await Workout.findByIdAndUpdate(req.params.id, {status: "completed"}, {new: true});
		res.status(200).json({
			message: "Workout status updated successfully",
			updatedWorkout: completedWorkout
		})

	} catch(error) {errorHandler(error, req, res)}

}