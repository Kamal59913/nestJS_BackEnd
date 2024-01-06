import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Admin{

 @Prop()
 name: string;

 @Prop()
 email: string;

 @Prop()
 image: string;

}


export const adminSchema = SchemaFactory.createForClass(Admin)