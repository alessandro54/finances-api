class Base {
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

export class NewUserDto extends Base {
  password: string;
}

export class UserDto extends Base {
  id: string;
}

export class UserLoginDto {
  username: string;
  password: string;
}
