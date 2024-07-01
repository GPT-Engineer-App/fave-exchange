import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { Button } from '@/components/ui/button';
import { FaHome } from 'react-icons/fa';

const Index = () => {
  const { currentUser } = useAuth();

  return (
    <div className="h-screen w-screen flex items-center justify-center spacing-md">
      <div className="spacing-y-sm">
        <h1 className="text-3xl text-center"><FaHome /> Your Blank Canvas</h1>
        <p className="text-center">
          Chat with the agent to start making edits.
        </p>
        {currentUser ? (
          <div className="text-center spacing-y-sm">
            <p>Welcome, {currentUser.email}</p>
            <Link to="/profile">
              <Button>Profile</Button>
            </Link>
            <Link to="/service-requests">
              <Button>Service Requests</Button>
            </Link>
          </div>
        ) : (
          <div className="text-center spacing-y-sm">
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;