import React, { useState, useEffect } from "react";
import { PaymentElement, LinkAuthenticationElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const paymentElementOptions = {
        layout: "tabs",
    };

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:5173/success",
            },
        });

        if (error?.type === "card_error" || error?.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred");
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <LinkAuthenticationElement
                id="link-authentication-element"
                onChange={(event) => setEmail(event.value)} // ✅ Fixed this line
            />
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay Now"}
                </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
};

export default CheckoutForm;
