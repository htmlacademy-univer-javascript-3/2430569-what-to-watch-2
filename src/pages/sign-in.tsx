import {Logo} from '../components/logo.tsx';
import {Footer} from '../components/footer.tsx';
import {Navigate} from 'react-router-dom';
import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {ReducerName} from '../types/reducer-name.ts';
import {AuthStatus} from '../types/auth-status.ts';
import {ROUTES} from '../routes/routes-data.ts';
import {login} from '../store/api-actions.ts';

const EMAIL_PATTERN = /^[\w\d._-]+@[\w\d.-]+\.[\w]{2,4}$/;

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const stateAuthStatus = useAppSelector((state) => state[ReducerName.Auth].authStatus);

  if (stateAuthStatus === AuthStatus.AUTH) {
    return <Navigate to={ROUTES.MAIN}/>;
  }

  const SignInMessage = ({text}: {text: string}) => (
    <div className="sign-in__message">
      <p>{text}</p>
    </div>);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setEmail(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPassword(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email)) {
      return setError('Please enter a valid email address');
    }

    if (!/[a-z]/i.test(password) || !/[0-9]/.test(password)) {
      return setError('Passwords must contain: a minimum of 1 letter and a minimum of 1 numeric character');
    }

    if (password.length < 3) {
      return setError('We can’t recognize this email\n and password combination. Please try again');
    }

    dispatch(login({email: email, password: password}));
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          {error ? <SignInMessage text={error}/> : null}
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email"
                id="user-email" onChange={handleEmailChange}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password"
                id="user-password" onChange={handlePasswordChange}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer/>
    </div>
  );
};
