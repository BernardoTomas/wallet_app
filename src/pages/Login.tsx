import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { submitLoginAction } from '../redux/actions';
import './Login.css';

const loginInputClasses = 'leading-5 h-8 pl-1 mb-4 mt-2';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailInput: '',
    passwordInput: '',
  });
  const [loginBtnDisabled, setLoginBtnDisabled] = useState(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,4}$/;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const updatedFormData = { ...formData, [id]: value };
    setFormData(updatedFormData);
    const isFormValid = emailRegex
      .test(updatedFormData.emailInput) && updatedFormData.passwordInput.length >= 6;
    setLoginBtnDisabled(!isFormValid);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(submitLoginAction(formData.emailInput));
    navigate('/carteira');
  };

  return (
    <main className="w-100vw flex flex-col min-h-screen items-center bg-stone-300">
      <div className="login-bg-image bg-cover min-h-2/4 w-full z-0" />
      <div
        className="login-container flex flex-col items-center p-8 min-w-xl shadow-2xl
        rounded-xl z-10 bg-white"
      >
        <h2>Login</h2>
        <form
          onSubmit={ handleSubmit }
          className="flex mt-4 flex-col"
        >
          <label htmlFor="emailInput">Email: </label>
          <input
            className={ loginInputClasses }
            onChange={ handleChange }
            data-testid="email-input"
            type="email"
            id="emailInput"
          />
          <label htmlFor="passwordInput">Senha: </label>
          <input
            className={ loginInputClasses }
            onChange={ handleChange }
            data-testid="password-input"
            type="password"
            id="passwordInput"
          />
          <button
            type="submit"
            disabled={ loginBtnDisabled }
            className="disabled:text-stone-500 disabled:bg-stone-300 bg-green-500
            text-white mt-4 h-10 rounded-md font-semibold hover:ring-4 ring-green-300
            duration-300"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
