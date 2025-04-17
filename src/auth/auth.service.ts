import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/services/users.service';
import { Users as UsersEntity } from '../users/models/users.entity';
import { LoginPayload, RegisterPayload } from 'src/users/type';

type TokenResponse = {
  token: {
    token_type: string;
    access_token: string;
  };
  is_admin: boolean;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(payload: RegisterPayload) {
    if (
      !payload.password ||
      !payload.repeatPassword ||
      payload.password !== payload.repeatPassword
    ) {
      throw new BadRequestException('Passwords do not match');
    }

    if (!payload.username) {
      throw new BadRequestException('Username is required');
    }

    const user = await this.usersService.findOne(payload.username);

    if (user) {
      throw new BadRequestException('User with such name already exists');
    }

    const { id: userId } = await this.usersService.createOne({
      name: payload.username,
      password: payload.password,
    });

    return { userId };
  }

  async validateUser(name: string, password: string): Promise<UsersEntity> {
    const user = await this.usersService.findOne(name);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async login(
    user: LoginPayload,
    type: 'jwt' | 'basic' | 'default',
  ): Promise<TokenResponse> {
    const LOGIN_MAP = {
      jwt: (user: LoginPayload) => this.loginJWT(user),
      basic: (user: LoginPayload) => this.loginBasic(user),
      default: (user: LoginPayload) => this.loginJWT(user),
    };
    const login = LOGIN_MAP[type];

    if (login) {
      return await login(user);
    } else {
      return await LOGIN_MAP.default(user);
    }
  }

  async loginJWT(user: LoginPayload) {
    const userDb = await this.validateUser(user.username, user.password);

    if (!userDb) {
      throw new BadRequestException("User doesn't exists");
    }

    const payload = { username: userDb.name, sub: userDb.id };

    return {
      token: {
        token_type: 'Bearer',
        access_token: this.jwtService.sign(payload),
      },
      is_admin: userDb.is_admin,
    };
  }

  async loginBasic(user: LoginPayload) {
    const userDb = await this.validateUser(user.username, user.password);

    if (!userDb) {
      throw new BadRequestException("User doesn't exists");
    }

    function encodeUserToken(user: UsersEntity) {
      const { name, password } = user;
      const buf = Buffer.from([name, password].join(':'), 'utf8');

      return buf.toString('base64');
    }

    return {
      token: {
        token_type: 'Basic',
        access_token: encodeUserToken(userDb),
      },
      is_admin: userDb.is_admin,
    };
  }
}
