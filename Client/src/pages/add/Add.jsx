import React, { useState, useReducer } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../components/reducer/gigReducer";
import upload from "../../utils/uploads";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };
  const handleUploads = async () => {
    setUploading(true);
    try {
        const cover = singleFile ? await upload(singleFile) : "";
        const images = await Promise.all([...files].map(upload));

        // 🔥 Filter out any failed (null) uploads
        const validImages = images.filter((img) => img !== null);

        setUploading(false);
        dispatch({ type: "ADD_IMAGES", payload: { cover, images: validImages } });
    } catch (error) {
        setUploading(false);
        console.error("Image upload failed:", error);
        alert("Image upload failed. Please try again."); // Notify the user
    }
};


  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (gig) => {
        return await newRequest.post("/gigs/createGig", gig);
    },
    onSuccess: () => {
        queryClient.invalidateQueries(["myGigs"]);
        navigate("/mygigs");
    },
    onError: (error) => {
        console.error("Error creating gig:", error);
        alert("Failed to create gig. Please check your input and try again."); // Notify the user
    },
});

const handleSubmit = (e) => {
  e.preventDefault();

  if (!state.title || !state.description || !state.price) {
      alert("Please fill in all required fields.");
      return;
  }

  // 🔥 Ensure at least one image is uploaded
  if (!state.cover && state.images.length === 0) {
      alert("Please upload at least one image.");
      return;
  }

  console.log("Submitting gig:", state);
  mutation.mutate(state);
};


  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" onChange={handleChange} placeholder="e.g. I will do something I'm really good at" />

            <label htmlFor="category">Category</label>
            <select name="category" id="category" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>

            <div className="images">
              <div className="imagesInputs">
                <label>Cover Image</label>
                <input type="file" onChange={(e) => setSingleFile(e.target.files[0])} />
                <label>Upload Images</label>
                <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
              </div>
              <button onClick={handleUploads}>{uploading ? "Uploading..." : "Upload"}</button>
            </div>

            <label>Description</label>
            <textarea name="description" onChange={handleChange} placeholder="Brief description of your service" rows="4"></textarea>

            <button onClick={handleSubmit}>Create</button>
          </div>

          <div className="details">
            <label>Service Title</label>
            <input type="text" name="shortTitle" onChange={handleChange} placeholder="e.g. One-page web design" />

            <label>Short Description</label>
            <textarea name="shortDescription" onChange={handleChange} placeholder="Short description of your service" rows="2"></textarea>

            <label>Delivery Time (days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />

            <label>Revision Number</label>
            <input type="number" name="revisionNumber" onChange={handleChange} />

            <label>Add Features</label>
            <form className="addForm" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">Add</button>
            </form>

            <div className="addFeatures">
              {state?.features?.map((feature, index) => (
                <div className="item" key={`${feature}-${index}`}>
                  <button onClick={() => dispatch({ type: "REMOVE_FEATURE", payload: feature })}>
                    {feature} <span>X</span>
                  </button>
                </div>
              ))}
            </div>

            <label>Price</label>
            <input type="number" name="price" onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
