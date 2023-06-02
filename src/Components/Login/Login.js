import React, { useState } from 'react';
import { attemptLogin } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const Login = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState({});

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    try {
      dispatch(attemptLogin(credentials, navigate));
      // navigate('/');
    } catch(err) {
        setError(err.response.data);
    }
  };

  let messages = [];
    if(error.errors) {
      messages = error.errors.map((e) => e.message);
    } else if(error.status) {
      if (error.status === 401) {
        messages.push('invalid credentials');
     } else messages.push(error.status);
  };

  return (
    <div>
      <form onSubmit={login}>
        <div className="form-group">
          <label>Email address</label>
          <input className="form-control" placeholder="Enter email" value={credentials.email} onChange={onChange} name='email' />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input className="form-control" placeholder="Password" value={credentials.password} onChange={onChange} name='password' />
        </div>
        <button type="submit" className="btn btn-primary" onClick={login}>Log in</button>
      </form>
    </div>
  );
};

export default Login;