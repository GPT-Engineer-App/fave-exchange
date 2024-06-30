import React, { useRef, useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError('Failed to log in');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-center text-2xl mb-4"><FaSignInAlt /> Log In</h2>
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
        <Button disabled={loading} type="submit">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default Login;