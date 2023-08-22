import { Body, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Users } from '../entities/user.entity';
import { UserProfileDto } from 'src/dtos/user.dtos/UserProfile.dto';
import { UserDto } from 'src/dtos/user.dtos/User.dto';
import { ComparePassword, GenerateHashedPassword } from 'src/helpers/hashPassword.helper';
import { SocialLoginDto } from 'src/dtos/user.dtos/SocialLogin.dto';
@Injectable()
export class UserService {
  constructor(@InjectRepository(Users) private userRepository: Repository<Users>,) {}

  async UserExists(email: string): Promise<{
    success: boolean;
    user: UserProfileDto;
    error: string;
  }> {
    try {
      let user = await this.userRepository.findOneBy({
          email : email
      })
      console.log("user==",user)
      if (user) {
        user.password = null
        return {
          success: true,
          user,
          error: 'Email already in use',
        };
      } else {
        return {
          success: false,
          user: null,
          error: 'No user found.',
        };
      }
    } catch (error: any) {
      return {
        user: null,
        success: false,
        error: error.message,
      };
    }
  }

  async GetUserProfile(userId: string): Promise<{
    success: boolean;
    profile: UserProfileDto;
    error: any;
    statusCode: number;
  }> {
    try {
      const profile = await this.userRepository.findOneBy(
        {
          _id: userId,
          is_deleted: 0,
        }
      );
      if (profile) {
        profile.password = null
        return {
          success: true,
          profile,
          error: null,
          statusCode: 200,
        };
      } else {
        return {
          success: false,
          profile: null,
          error: 'No profile with this id',
          statusCode: 400,
        };
      }
    } catch (error: any) {
      return {
        success: true,
        profile: null,
        error: error.message,
        statusCode: 500,
      };
    }
  }

  async CheckUser({
    id,
    email,
  }: {
    id: string;
    email: string;
  }): Promise<Users> {
    const user = await this.userRepository.findOneBy({
      _id: id,
      email: email,
      is_deleted: 0,
    });
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  async UpdateUser(data: SocialLoginDto): Promise<UserProfileDto> {
    const userUpdated = await this.userRepository.update(
      {
        email: data.email,
      },
      data,
    );
    const user = await this.userRepository.findOneBy({
      email : data.email
    })
    const { profile } = await this.GetUserProfile(user._id);
    return profile;
  }

  async GetAllOnlineUsers(): Promise<
    { id: string; name: string; email: string }[]
  > {
    const users = await this.userRepository.find({
      where:{
        is_logedin: 1,
        is_deleted: 0,
      }
      
    });
    let data = await Promise.all(
      users.map((it) => {
        return {
          id: it._id,
          name: it.name,
          email: it.email,
        };
      }),
    );
    data = data.filter((it) => it);
    return data;
  }

  async UpdateProfile(userId: string, data: { name: string }) {
    let userUpdated = await this.userRepository.update(
      {_id:userId},
      data,
    );
    let user = await this.userRepository.findOneBy({
      _id:userId
    })
    user.password = null;
    return user;
  }

  async UpdatePassword({
    userId,
    oldPassword,
    newPassword,
  }: {
    userId: string;
    oldPassword: string;
    newPassword: string;
  }) {
    const user = await this.userRepository.findOneBy({
      _id:userId
    });
    const isPasswordTrue = await ComparePassword({
      candidatePassword: oldPassword,
      hashedPassword: user.password,
    });
    if (isPasswordTrue) {
      const newHashedPassword = await GenerateHashedPassword(newPassword);
      const user = await this.userRepository.update(
        {_id:userId},
        {
          password: newHashedPassword,
        },
      );
      return {
        success: true,
        statusCode: 200,
        error: '',
      };
    } else {
      return {
        success: false,
        statusCode: 401,
        error: 'Invalid old password.',
      };
    }
  }

  async UpdatePasswordByEmail({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const hashedPassword = await GenerateHashedPassword(password);
    const user = await this.userRepository.update(
      {
        email: email,
      },
      {
        password: hashedPassword,
      },
    );
    return {
      success: true,
      statusCode: 200,
      error: '',
    };
  }

  async DeleteUser(userId: string) {
    const user = await this.userRepository.update({
      _id:userId
    }, {
      is_deleted: 1,
    });
  }

  async Logout(userId:string){
    await this.userRepository.update({
      _id : userId
    },{
      is_logedin : 0
    })
  }
}
