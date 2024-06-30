import React, { useRef, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaUserPlus } from 'react-icons/fa';

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-center text-2xl mb-4"><FaUserPlus /> Sign Up</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" ref={emailRef} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" ref={passwordRef} required />
        </div>
        <div className="mb-4">
          <Label htmlFor="password-confirm">Confirm Password</Label>
          <Input type="password" id="password-confirm" ref={passwordConfirmRef} required />
        </div>
        <Button disabled={loading} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;