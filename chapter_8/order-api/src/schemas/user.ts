import { Document, Model, model, Schema } from 'mongoose'
import { default as User } from '../models/user'

export interface UserModel extends User, Document {}

export const UserSchema: Schema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,
  userStatus: Number,
  username: String,
})

export const UserModel: Model<UserModel> = model<UserModel>('User', UserSchema)
