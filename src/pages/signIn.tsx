import {Logo} from '../components/logo.tsx';

export const SignIn = ({isError = false, isMessage = false}: {isError?: boolean; isMessage?: boolean}) => {
  const SignInMessage = ({text}: {text: string}) => (
    <div className="sign-in__message">
      <p>{text}</p>
    </div>);
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form">
          {isError ? <SignInMessage text={'Please enter a valid email address'}/> : null}
          {isMessage ? <SignInMessage text={'We can’t recognize this email\n and password combination. Please try again.'}/> : null}
          <div className="sign-in__fields">
            <div className={`sign-in__field ${isError ? 'sign-in__field--error' : ''}`}>
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email"
                id="user-email"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password"
                id="user-password"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <Logo light/>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};
