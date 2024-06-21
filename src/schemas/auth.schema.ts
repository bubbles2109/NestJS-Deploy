import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'account', versionKey: false })

export class AuthSche {
    @Prop({ required: true })
    username: string

    @Prop({ required: true })
    password: string

    @Prop({ required: true })
    accessToken: string

    @Prop({ required: true })
    refreshToken: string
}

export const AuthSchema = SchemaFactory.createForClass(AuthSche)