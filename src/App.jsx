import './firebaseConfig';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
  return (
    <AuthProvider>
      <Router>
        <div className="grid-container">
          <header className="header">Header</header>
          <aside className="sidebar">Sidebar</aside>
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