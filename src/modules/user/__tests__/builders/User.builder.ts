import { ISignUpArgs } from '../../domain/usecases/ISignUp.usecase';

class UserBuilder {
  private readonly user: ISignUpArgs = {
    fullname: 'John Doe',
    email: 'johndoe@test.com',
    password: '123456',
    password_confirmation: '123456',
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

  public build(): ISignUpArgs {
    return this.user;
  }
}

export default UserBuilder;
