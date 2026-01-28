import mongoose, {Schema,Document} from "mongoose";

export interface Iuser extends Document {
 firstName:string;
 lastName:string;
 email:string;
 passward:string;
}

const userSchema = new Schema<Iuser>({
  firstName:{type: String, required:true},
  lastName:{type: String, required:true},
  email:{type: String, required:true},
  passward:{type: String, required:true}
})

const usermodel = mongoose.model<Iuser>('User', userSchema);

export default usermodel;