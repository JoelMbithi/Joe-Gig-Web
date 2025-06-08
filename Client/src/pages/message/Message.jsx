import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Message.scss";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";


const Message = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  // Fetch messages
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", id],
    queryFn: async () => {
      const res = await newRequest.get(`/messages/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Mutation for sending messages
  const mutation = useMutation({
    mutationFn: (message) => newRequest.post("/messages", message),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", id]);
    },
  });

  // Handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const messageText = e.target[0].value.trim();
    if (!messageText) {
      alert("Message cannot be empty!");
      return;
    }

    mutation.mutate({
      conversationId: id,
      userId: JSON.parse(localStorage.getItem("currentUser"))._id,
      description: messageText,
    });

    e.target[0].value = "";
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages" className="link">MESSAGES</Link> {">"} Joe Mbithi
        </span>

        {isLoading ? (
          "Loading..."
        ) : error ? (
          "Something went wrong!"
        ) : (
          <div className="messages">
            {data && data.map((message) => (
              <div className={message.userId === currentUser._id ? "owner item" : "item"} key={message._id}>
                <img
                  src={currentUser.img}
                  alt=""
                />
                <p>{message.description}</p>
              </div>
            ))}
          </div>
        )}

        <hr />

        <form className="write" onSubmit={handleSubmit}>
          <textarea placeholder="Write a message..." cols="30" rows="10"></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
