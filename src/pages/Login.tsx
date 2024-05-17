import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { submitLoginActionCreator } from '../redux/actions';

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
    dispatch(submitLoginActionCreator(formData.emailInput));
    navigate('/carteira');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="emailInput">Email: </label>
        <input
          onChange={ handleChange }
          data-testid="email-input"
          type="email"
          id="emailInput"
        />
        <label htmlFor="passwordInput">Senha: </label>
        <input
          onChange={ handleChange }
          data-testid="password-input"
          type="password"
          id="passwordInput"
        />
        <button type="submit" disabled={ loginBtnDisabled }>Entrar</button>
      </form>
    </div>
  );
}

export default Login;
