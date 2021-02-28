import IUserDTO from '../../dtos/IUser.dto';

class UserBuilder {
  private readonly user: IUserDTO = {
    fullname: 'John Doe',
    email: 'johndoe@test.com',
    password: '123456',
  };

  public static aUser(): UserBuilder {
    return new UserBuilder();
  }

  public withInvalidEmail(): UserBuilder {
    this.user.email = 'invalid-email';
    return this;
  }

  public withEmptyFullname(): UserBuilder {
    this.user.fullname = '';
    return this;
  }

  public withEmptyEmail(): UserBuilder {
    this.user.email = '';
    return this;
  }

  public withEmptyPassword(): UserBuilder {
    this.user.password = '';
    return this;
  }

  public build(): IUserDTO {
    return this.user;
  }
}

export default UserBuilder;
