import Plant from "../models/plantModel.js";
import User from "../models/userModel.js";

export const addPlant = async (req, res) => {
    try {       
        const { name, species, wateringFrequency } = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const newPlant = new Plant({
            name,
            species,
            wateringFrequency,
            owner: userId
        });
        user.plants.push(newPlant._id);
        await user.save();
        await newPlant.save();
        res.status(201).json({ message: "Plant added successfully", plant: newPlant });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const getPlants = async (req, res) => {
    try {
        const userId = req.user.id;
        const plants = await Plant.find({ owner: userId });
        res.status(200).json({ plants });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const deletePlant = async (req, res) => {
    try {
        const plantId = req.params.id;
        const userId = req.user.id;
        const plant = await Plant.findOneAndDelete({ _id: plantId, owner: userId });
        if (!plant) {
            return res.status(404).json({ message: "Plant not found or unauthorized" });
        }   
        res.status(200).json({ message: "Plant deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
