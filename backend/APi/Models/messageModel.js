import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new Schema({
  conversationId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: null,
  },
  description: {
    type: String,
    required: true,
  },
},{
  timestamps:true
});

export default mongoose.model("Message", MessageSchema)