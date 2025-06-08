
import Review from "../Models/reviewModel.js"
import Gig from "../Models/gigModel.js"

//Create a Review
export const createReview = async (req,res) => {
    try {
        if(req.isSeller)
            return res.status(403).send("Sellers Can't create a review")

        //create a review
        const newReview = await Review({
            userId: req.userId,
            gigId: req.body.gigId,
            desc: req.body.desc,
            star: req.body.star,
        })

        //check if you created a review on the same gig you wont be allowed
        const review = await Review.findOne({
            gigId: req.body.gigId,
            userId: req.userId
        })

        if(review)
            return res.status(403).send("You have already created a review on these gig!")

        const savedReview = await newReview.save()

        //update my gigModel
        await Gig.findByIdAndUpdate(req.body.gigId,{
            $inc: { totalStars: req.body.star, starNumber: 1 },
        })
        res.status(200).json(savedReview)



    } catch (error) {
        res.status(500).json(error)
    }
};


//Get A Review

export const getReview = async (req,res) =>{
    try {

       

        const reviews = await Review.find({ gigId:req.params.gigId });

        res.status(200).json(reviews)
        
    } catch (error) {
        res.status(500).json(error)
    }
}