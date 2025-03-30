import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'individual' | 'pharmacy' | 'hospital' | 'consultant';
  profileImage?: string;
  address?: string;
  phone?: string;
  licenseNumber?: string;
  specialty?: string;
  bio?: string;
  ratings?: number;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['individual', 'pharmacy', 'hospital', 'consultant'],
    required: true
  },
  profileImage: {
    type: String
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  licenseNumber: {
    type: String
  },
  specialty: {
    type: String
  },
  bio: {
    type: String
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
