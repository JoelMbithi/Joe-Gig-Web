import React from "react";
import "./MyGigs.scss";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/delete.png";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const MyGigs = () => {
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
  };

  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  //  Fetch gigs for the current user
  const { isLoading, data, error } = useQuery({
    queryKey: ["myGigs", currentUser?.id],
    queryFn: async () => {
      const response = await newRequest.get(`/gigs/user/${currentUser?._id}`);
      return response.data; 
    },
    enabled: !!currentUser,
  });

  //  Delete gig mutation
  const mutation = useMutation({
    mutationFn: async (id) => {
      await newRequest.delete(`/gigs/deleteGig/${id}`);
      
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
    onError: (error) => {
      console.error("Error deleting gig:", error);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this gig?")) {
      mutation.mutate(id);
    }
  };

  return (
    <div className="myGigs">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="title">
            <h1>My Gigs</h1>
            <Link to="/add">
              <button>Add New Gig</button>
            </Link>
          </div>

          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Orders</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((gig) => (
                  <tr key={gig._id}>
                    <td>
                      <img className="image" src={gig.cover} alt="Gig Cover" />
                    </td>
                    <td>{gig.title}</td>
                    <td>${gig.price}</td>
                    <td>{gig.sales}</td>
                    <td>
                      <img
                        className="delete"
                        src={deleteIcon}
                        onClick={() => handleDelete(gig._id)}
                        alt="Delete Icon"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No gigs found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyGigs;
