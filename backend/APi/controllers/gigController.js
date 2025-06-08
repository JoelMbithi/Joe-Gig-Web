import Gig from "../Models/gigModel.js";

// ✅ Creating a new gig (Only for Sellers)
export const createGig = async (req, res) => {
    console.log("Request Body:", req.body); // Log the request payload
    if (!req.isSeller)
        return res.status(403).json({ message: "Only Sellers can create a gig" });

    const newGig = new Gig({
        userId: req.userId,
        ...req.body,
    });

    try {
        const savedGig = await newGig.save();
        res.status(201).json(savedGig);
    } catch (error) {
        console.error("Error creating gig:", error); // Log the error
        res.status(500).json({ message: "Unable to create a new gig", error: error.message });
    }
};

// ✅ Deleting a gig (Only the gig owner can delete)
export const deleteGig = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if (!gig) return res.status(404).json({ message: "Gig not found" });

        if (gig.userId.toString() !== req.userId) {
            return res.status(403).json({ message: "You can only delete your own gig" });
        }

        await Gig.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Gig has been deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting gig", error });
    }
};

// ✅ Getting a single gig
export const getGig = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if (!gig) return res.status(404).json({ message: "Gig not found" });

        res.status(200).json(gig);
    } catch (error) {
        res.status(500).json({ message: "Error fetching gig", error });
    }
};

// ✅ Getting all gigs (with filtering)
export const getGigs = async (req, res) => {
    const q = req.query;

    const filters = {
        ...(q.userId && { userId: q.userId }),
        ...(q.category && { category: q.category }),
        ...((q.min || q.max) && {
            price: { 
                ...(q.min && { $gte: Number(q.min) }),
                ...(q.max && { $lte: Number(q.max) })
            } 
        }),
        ...(q.search && { title: { $regex: q.search, $options: "i" } })
    };

    try {
        const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
        res.status(200).json(gigs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching gigs", error });
    }
};

// ✅ Getting all gigs for a specific user
export const getUserGigs = async (req, res) => {
    try {
        const gigs = await Gig.find({ userId: req.params.id });
        res.status(200).json(gigs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user gigs", error });
    }
};
