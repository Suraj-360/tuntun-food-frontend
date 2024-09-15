import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from './screens/Home'
import Login from './screens/Login'
import SignUp from './screens/SignUp';
import { CartProvider } from './components/ContextReducer';
import Cart from './screens/Cart';
import NotFound from './components/NotFound';
import About from './screens/About';
import MyOrder from './screens/MyOrder';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivacyPolicy from './screens/PrivacyPolicy';
import TermsAndConditions from './screens/TermsAndConditions';
import { UserProvider } from './components/UserContextProvider';
import EmailVerificationSuccess from './components/EmailVerificationSuccess';
import VerificationError from './components/VerificationError';
import Category from './screens/Category';

function App() {
  return (
    <UserProvider>
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/about' element={<About/>}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/signup' element={<SignUp />}></Route>
            <Route exact path='/cart' element={<Cart/>}></Route>
            <Route exact path='/category' element={<Category/>}></Route>
            <Route exact path='/my-order' element={<MyOrder/>}></Route>
            <Route exact path='/privacy-policy' element={<PrivacyPolicy/>}></Route>
            <Route exact path='/terms-and-conditions' element={<TermsAndConditions/>}></Route>
            <Route path="/verify-email-success" element={<EmailVerificationSuccess/>} />
            <Route path="/verify-email-failure" element={<VerificationError/>} />
            <Route path='*' element={<NotFound/>} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </CartProvider>
    </UserProvider>
  );
}

export default App;
