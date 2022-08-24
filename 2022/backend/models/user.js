import mongoose from "mongoose";
import { mongoOptions, mongoDbConnectionString } from "../configs/configs.js";
import passportLocalMongoose from "passport-local-mongoose";
import { faker } from '@faker-js/faker';

const { Schema, model } = mongoose;

const Session = new Schema({
    refreshToken: {
        type: String,
        default: ""
    }
})

const User = new Schema({
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    age: { type: Number, default: 0 },
    icon: { type: String, default: faker.image.avatar() },
    authStraegy: { type: String, default: "local" },
    refreshToken: { type: [Session] }
})

User.set("toJSON", {
    transform: (doc, ret, options) => {
        delete ret.refreshToken
        return ret
    }
})

User.plugin(passportLocalMongoose);

let UserModel

await mongoose.connect(mongoDbConnectionString, mongoOptions)
.then(() => {
    UserModel = model("User", User);
})
.catch(err => {
    console.log(err);
});

export default UserModel;