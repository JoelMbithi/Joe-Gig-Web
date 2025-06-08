import Stripe from "stripe";
import dotenv from "dotenv";

import Order from "../Models/orderModel.js";
import Gig from "../Models/gigModel.js";

dotenv.config(); // Ensure env variables are loaded

console.log("STRIPE_KEY:", process.env.STRIPE_KEY); // Debugging

const stripe = new Stripe(process.env.STRIPE_KEY); // Ensure the key is set


// Payment Intent Endpoint
export const intent = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if (!gig) {
            return res.status(404).json({ message: "Gig not found" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: gig.price * 100, // Convert to cents
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        const newOrder = new Order({
            gigId: gig._id,
            img: gig.cover,
            title: gig.title,
            buyerId: req.userId,
            sellerId: gig.userId,
            price: gig.price,
            payment_intent: paymentIntent.id,
        });

        await newOrder.save();
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ message: error.message });
    }
};


//get Order

export const getOrder = async (req,res) => {

    try {
        const orders = await Order.find({
            ...(req.isSeller ? 
                { sellerId: req.userId} 
                : { buyerId: req.userId}),
                isCompleted: true,
            
        })
        res.status(200).json(orders)
        
    } catch (error) {
        res.status(500).json(error)
    }

}

//confirm payment
export const confirmPayment = async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate(
            { payment_intent: req.body.payment_intent },
            { $set: { isCompleted: true } },
            { new: true } // Returns updated order
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).send("Order has been confirmed");
    } catch (error) {
        console.error("Error confirming payment:", error);
        res.status(500).json({ message: error.message });
    }
};
 