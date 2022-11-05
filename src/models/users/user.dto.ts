class Base {
  email: string;
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
  email: string;
  password: string;
}
