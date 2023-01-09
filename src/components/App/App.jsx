import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import MentorFeedbackForm from '../MentorFeedbackForm/MentorFeedbackForm';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import HomePage from '../HomePage/HomePage';
import Resources from '../Resources/Resources';
import LoginPage from '../LoginPage/LoginPage';
import AddResourceForm from '../AddResourceForm/AddResourceForm';
import AddUserForm from '../AddUserForm/AddUserForm';
import AllEvents from '../AllEvents/AllEvents';
import UserDetails from '../UserDetails/UserDetails';
import AllUsers from '../AllUsers/AllUsers';
import MobileNavBar from '../MobileNavBar/MobileNavBar';
import EditUser from '../EditUser/EditUser';
import EventDetails from '../EventDetails/EventDetails';
import EventCalendar from '../EventCalendar/EventCalendar';
import CalendarEventList from '../CalendarEventList/CalendarEventList';
import NewEventForm from '../NewEventForm/NewEventForm';
import EventAttendees from '../EventAttendees/EventAttendees';
import EditEvents from '../EditEvents/EditEvents';
import EditProfilePicture from '../EditProfilePicture/EditProfilePicture';
import './App.css';
import EditProfilePage from '../EditProfilePage/EditProfilePage';
import PasswordReset from '../PasswordReset/PasswordReset';
import ForgotPassword from '../ForgotPassword/ForgotPassword';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          {/* <Redirect exact from="/" to="/home" /> */}

          {/* if the usertype is 5 (admin??) then redirect upon login to the AllEventsPage, otherwise ProfilePage */}
          <ProtectedRoute exact path="/homepage">
            {user.userType == 5 ?
              <Redirect to="/allEvents" />
              :
              <HomePage />}
            
          </ProtectedRoute>

          <ProtectedRoute exact path='/AllEvents'>
            {user.userType < 5 ? 
            <Redirect to='/homepage'/> :
            <AllEvents />}
          </ProtectedRoute>

          <ProtectedRoute exact path='/allusers/:id/edit'>
            <EditUser />
          </ProtectedRoute>

          <ProtectedRoute exact path='/mentorfeedbackform'>
            <MentorFeedbackForm />
          </ProtectedRoute>

          <ProtectedRoute exact path='/AddUserForm'>
            <AddUserForm />
          </ProtectedRoute>

          <ProtectedRoute exact path="/resources">
            <Resources />
          </ProtectedRoute>

          <ProtectedRoute exact path='/AddResourceForm'>
            <AddResourceForm />
          </ProtectedRoute>

          {/* Does this need to be a protected route? */}
          <Route exact path="/login">
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/homepage" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/reset/:token"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <PasswordReset />
            }
          </Route>

          <ProtectedRoute exact path='/EventCalendar'>
            <EventCalendar />
          </ProtectedRoute>

          <ProtectedRoute exact path='/EventDetails/event/:id'>
            <EventDetails />
          </ProtectedRoute>

          <ProtectedRoute exact path='/NewEventForm'>
            <NewEventForm />
          </ProtectedRoute>

          <ProtectedRoute exact path='/AllEvents/attendees/event/:id'>
          {user.userType < 5 ? 
            <Redirect to='/homepage'/> :
            <EventAttendees />
          }  
          </ProtectedRoute>

          <ProtectedRoute exact path='/AllEvents/:id/edit'>
            <EditEvents />
          </ProtectedRoute>

          <ProtectedRoute exact path='/allusers'>
            <AllUsers />
          </ProtectedRoute>

          <ProtectedRoute exact path='/UserDetails/:id'>
            <UserDetails />
          </ProtectedRoute>

          <ProtectedRoute exact path='/homepage/:id/edit'>
            <EditProfilePage />
          </ProtectedRoute>

          <ProtectedRoute exact path='/ProfilePicture/edit'>
            <EditProfilePicture />
          </ProtectedRoute>

          <Route exact path='/forgot'>
            <ForgotPassword />
          </Route>

          <ProtectedRoute exact path='/MobileNavBar'>
            <MobileNavBar />
          </ProtectedRoute>

          <ProtectedRoute exact path='/CalendarEventList'>
            <CalendarEventList />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a default message. */}
          <Route>
            <h1>This page doesn't exist.</h1>
          </Route>
        </Switch>
        <Footer />
      </div>

    </Router>
  );
}

export default App;