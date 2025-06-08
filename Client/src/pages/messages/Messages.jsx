import React from "react";
import "./Messages.scss";
import { Link } from "react-router-dom";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import moment from "moment";

const Messages = () => { 
  const queryClient = useQueryClient()
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversation"],
    queryFn: () =>
      newRequest.get(`/conversation`).then((res) => res.data),
  });

  //handle read

 

  const mutation = useMutation({
    mutationFn: (id) =>{
      return newRequest.put(`/conversation/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversation"]);
   }
  })

  const handleRead = (id)=> {
   mutation.mutate(id)
  }

  return (
    <div className="messages">
      {isLoading ? (
        "loading..."
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>

          <table>
            <thead>
              <tr>
                <th>Buyer</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((conversation) => (
                <tr
                  className={
                    (currentUser.isSeller && !conversation.readBySeller) ||
                    (!currentUser.isSeller && !conversation.readByBuyer)
                      ? "active"
                      : ""
                  }
                  key={conversation.id}
                >
                  <td>
                    {currentUser.isSeller
                      ? conversation.buyerId
                      : conversation.sellerId}
                  </td>
                  <td>
                    <Link className="link" to={`/message/${conversation.id}`}>
                      {conversation?.lastMessage?.substring(0, 50)}...
                    </Link>
                  </td>
                  <td>{moment(conversation.updatedAt).fromNow()}</td>
                    <td>
                      {((currentUser.isSeller && !conversation.readBySeller) ||
                        (!currentUser.isSeller && !conversation.readByBuyer)) && (
                        <button onClick={() => handleRead(conversation.id)}>Mark as read</button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
