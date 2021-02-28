import ISignInDTO from '../../dtos/ISignIn.dto';

class SignInBuilder {
  private readonly signInData: ISignInDTO = {
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

  public build(): ISignInDTO {
    return this.signInData;
  }
}

export default SignInBuilder;
