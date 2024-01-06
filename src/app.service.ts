import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Admin } from './admin.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Admin.name)
    private userModel: mongoose.Model<Admin>,
  ) {}


  async login({
    email,
    name,
    image,
  }: {
    email: string;
    name: string;
    image: string;
  }): Promise<any> {
    const userExists = await this.userModel.findOne({
      email: email,
    });
    if (!userExists) {
      const createdUser = new this.userModel({
        email,
        name,
        image,
      });
      await createdUser.save()
      return createdUser
    } else {
      return userExists
    }
  }

  async findAllAdmin(): Promise<Admin[]> {
    const admins = await this.userModel.find();
    return admins;
  }

  async createAdmin(admin: Admin): Promise<Admin> {
    const newAdmin = await this.userModel.create(admin);
    return newAdmin;
  }

}
