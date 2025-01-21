import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema(
  {
    trip_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
    },
    email: {
      type:mongoose.Schema.ObjectId,
      ref:'User'
      
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    start_date: {
      type: Date,
      required: true, 
    },
    end_date: {
      type: Date,
      required: true, 
    },
    budget: {
      type: Number,
      required: true,
      min: [0, 'Budget must be a positive number'],
    },
    total_distance: {
      type: Number,
      default: 0,
      min: [0, 'Distance must be a positive number'],
    },
    total_time: {
      type: Number,
      default: 0,
      min: [0, 'Time must be a positive number'],
    },
  },
  {
    timestamps: true,
  }
);

const tripModel = mongoose.model('Trip', tripSchema);

export default tripModel;
