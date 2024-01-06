import { Body, Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';
import { Admin } from './admin.schema';
import { OAuth2Client } from 'google-auth-library';


const client = new OAuth2Client(
  '560963277459-nl156iumhmjeeu301ln2mi208bhfdapn.apps.googleusercontent.com',
  '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',
);

@Controller() 
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/login')
  async login(@Body('token') token): Promise<any> {

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:'560963277459-nl156iumhmjeeu301ln2mi208bhfdapn.apps.googleusercontent.com'
    });

    const payload = ticket.getPayload();
    const data = await this.appService.login({
      email: payload.email,
      name: payload.name,
      image: payload.picture
    })
    console.log('here is the data',data)
    return data;
  }
  @Get()
  async getAllAdmins(): Promise<Admin[]> {
    return this.appService.findAllAdmin();
  }

}
