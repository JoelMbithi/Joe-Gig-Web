import axios from "axios";

const upload = async (file) => {
  const CLOUD_NAME = "dz6pydmk6"; 
  const UPLOAD_PRESET = "JoeGigs"; 

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );

    // Extract the uploaded image URL from the response
    const { secure_url } = res.data; 
    return secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

export default upload;
