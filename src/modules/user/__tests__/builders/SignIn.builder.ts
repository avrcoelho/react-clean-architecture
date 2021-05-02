import { ISignInArgs } from '../../domain/usecases/ISignIn.usecase';

class SignInBuilder {
  private readonly signInData: ISignInArgs = {
    email: 'johndoe@test.com',
    password: '123456',
  };

  public static aSignInData(): SignInBuilder {
    return new SignInBuilder();
  }

  public withInvalidEmail(): SignInBuilder {
    this.signInData.email = 'invalid-email';
    return this;
  }

  public withEmptyEmail(): SignInBuilder {
    this.signInData.email = '';
    return this;
  }

  public withEmptyPassword(): SignInBuilder {
    this.signInData.password = '';
    return this;
  }

  public build(): ISignInArgs {
    return this.signInData;
  }
}

export default SignInBuilder;
