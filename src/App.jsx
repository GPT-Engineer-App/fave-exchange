import './firebaseConfig';
import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import { FaUser, FaBell, FaEnvelope, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from './components/AuthProvider';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Index from "./pages/Index.jsx";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import ServiceListings from './pages/ServiceListings.jsx';
import { AuthProvider } from "./components/AuthProvider.jsx";
import NotificationList from './components/NotificationList';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import PaymentForm from './components/PaymentForm';
import TransactionHistory from './components/TransactionHistory';
import RefundForm from './components/RefundForm';
import AdminPanel from "./pages/AdminPanel.jsx";
import Forum from "./components/Forum.jsx";
import GroupServices from "./components/GroupServices.jsx";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  };

  return (
    <AuthProvider>
      <Router>
        <div className="grid-container">
          <header className="header">Header</header>
          <aside className="sidebar">
            <div className="profile-section">
              <Link to="/profile" className="sidebar-link">
                <FaUser className="sidebar-icon" /> Profile
              </Link>
            </div>
            <nav className="sidebar-nav">
              <ul>
                <li>
                  <Link to="/notifications" className="sidebar-link">
                    <FaBell className="sidebar-icon" /> Notifications
                  </Link>
                </li>
                <li>
                  <Link to="/messages" className="sidebar-link">
                    <FaEnvelope className="sidebar-icon" /> Messages
                  </Link>
                </li>
                <li>
                  <Link to="/service-requests" className="sidebar-link">
                    <FaClipboardList className="sidebar-icon" /> Service Requests
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="sidebar-link">
                    <FaSignOutAlt className="sidebar-icon" /> Logout
                  </button>
                </li>
              </ul>
            </nav>
          </aside>
          <main className="main">
            <TransitionGroup>
              <CSSTransition timeout={300} classNames="fade">
                <Routes>
                  <Route exact path="/" element={<Index />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/service-listings" element={<ServiceListings />} />
                  <Route path="/notifications" element={<NotificationList />} />
                  <Route path="/messages" element={<MessageForm />} />
                  <Route path="/message-list" element={<MessageList />} />
                  <Route path="/payment" element={<PaymentForm />} />
                  <Route path="/transactions" element={<TransactionHistory />} />
                  <Route path="/refund" element={<RefundForm />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/forum" element={<Forum />} />
                  <Route path="/group-services" element={<GroupServices />} />
                </Routes>
              </CSSTransition>
            </TransitionGroup>
          </main>
          <footer className="footer">Footer</footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;