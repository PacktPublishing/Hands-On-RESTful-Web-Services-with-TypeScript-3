import { Document, Model, model, Schema } from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'
import { default as User } from '../models/user'

export interface UserModel extends User, Document {}

export const UserSchema: Schema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  userStatus: Number,
  username: String,
})

UserSchema.plugin(uniqueValidator)

export const UserModel: Model<UserModel> = model<UserModel>('User', UserSchema)
