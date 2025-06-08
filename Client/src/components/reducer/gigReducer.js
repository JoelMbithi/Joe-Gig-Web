export const INITIAL_STATE = {
    userId: JSON.parse(localStorage.getItem("currentUser"))?._id || "",
    title: "",
    category: "",
    cover: "",
    images: [],
    description: "",
    shortTitle: "",
    shortDescription: "",
    deliveryTime: 0,
    revisionNumber: 0,
    features: [],
    price: 0,
  };
  
  export const gigReducer = (state, action) => {
    switch (action.type) {  // ✅ Correct switch syntax
      case "CHANGE_INPUT":
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
  
      case "ADD_IMAGES":
        return {
          ...state,
          cover: action.payload.cover,
          images: action.payload.images, // ✅ Correct property access
        };
  
      case "ADD_FEATURE":
        return {
          ...state,
          features: [...state.features, action.payload], // ✅ Correct spread syntax
        };
  
      case "REMOVE_FEATURE":
        return {
          ...state,
          features: state.features.filter((feature) => feature !== action.payload),
        };
  
      default:
        return state;
    }
  };
  