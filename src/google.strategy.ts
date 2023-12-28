import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: '560963277459-nl156iumhmjeeu301ln2mi208bhfdapn.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'https://kamal59913-nestjs-backend.onrender.com/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const user = {
            email: profile.emails ? profile.emails[0].value : null,
            displayName: profile.displayName,
            // picture: photos[0].value,
            
            googleId: profile.id,
            name: profile.displayName,
            username: profile.name.givenName,
            institute: profile.name.familyName,
            googleprofileimage: profile.photos[0].value,
            accessToken
        }
        done(null, user);
    }
}