import React, { useState, useEffect } from "react";
import "./pay.scss";
import { loadStripe } from "@stripe/stripe-js"; // Correct import
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe("pk_test_51PjQ6bRpAOqKeKpZfmvxxbYgVNO3dp27GOJP9ITxC9naNbJh6pjFzIbGqvAFvvIAyOSws3JlveZD2WaqqKs8MC3e00zjG7Q3EJ");

const Pay = () => {
    const [clientSecret, setClientSecret] = useState("");
    const { id } = useParams();

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const makeRequest = async () => {
            try {
                const res = await newRequest.post(`/orders/create-payment-intent/${id}`);
                setClientSecret(res.data.clientSecret);
            } catch (error) {
                console.log(error);
            }
        };
        makeRequest();
    }, [id]);

    const appearance = {
        theme: "stripe",
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="pay">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
};

export default Pay;
