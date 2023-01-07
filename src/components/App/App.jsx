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
import Feedback from '../Feedback/Feedback';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProfilePage from '../ProfilePage/ProfilePage';
import Resources from '../Resources/Resources';
import LoginPage from '../LoginPage/LoginPage';
import AddResourceForm from '../AddResourceForm/AddResourceForm';
import AddUserForm from '../AddUserForm/AddUserForm';
import AllEventsList from '../AllEventsList/AllEventsList';
import AllUsersDetails from '../AllUsersDetails/AllUsersDetails';
import AllUsersList from '../AllUsersList/AllUsersList';
import Drawers from '../Drawer/Drawer';
import EditUser from '../EditUser/EditUser';
import EventDetails from '../EventDetails/EventDetails';
import EventList from '../EventList/EventList';
import EventListItems from '../EventListItems/EventListItems';
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
          <ProtectedRoute exact path="/home">
            {user.userType == 5 ?
              <Redirect to="/allEventsList" />
              :
              <ProfilePage />}
          </ProtectedRoute>

          <ProtectedRoute exact path='/AllEventsList'>
            <AllEventsList />
          </ProtectedRoute>

          <ProtectedRoute exact path='/allusers/:id/edit'>
            <EditUser />
          </ProtectedRoute>

          <ProtectedRoute exact path='/feedback'>
            <Feedback />
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
              <Redirect to="/home" />
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

          <ProtectedRoute exact path='/EventList'>
            <EventList />
          </ProtectedRoute>

          <ProtectedRoute exact path='/EventDetails/event/:id'>
            <EventDetails />
          </ProtectedRoute>

          <ProtectedRoute exact path='/NewEventForm'>
            <NewEventForm />
          </ProtectedRoute>

          <ProtectedRoute exact path='/AllEventsList/attendees/event/:id'>
            <EventAttendees />
          </ProtectedRoute>

          <ProtectedRoute exact path='/AllEventsList/:id/edit'>
            <EditEvents />
          </ProtectedRoute>

          <ProtectedRoute exact path='/allusers'>
            <AllUsersList />
          </ProtectedRoute>

          <ProtectedRoute exact path='/AllUsersDetails/:id'>
            <AllUsersDetails />
          </ProtectedRoute>

          <ProtectedRoute exact path='/home/:id/edit'>
            <EditProfilePage />
          </ProtectedRoute>

          <ProtectedRoute exact path='/ProfilePicture/edit'>
            <EditProfilePicture />
          </ProtectedRoute>

          <ProtectedRoute exact path='/forgot'>
            <ForgotPassword />
          </ProtectedRoute>

          <ProtectedRoute exact path='/Drawers'>
            <Drawers />
          </ProtectedRoute>

          <ProtectedRoute exact path='/EventListItems'>
            <EventListItems />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a default message. */}
          <Route>
            <h1>Yo, this page doesn't exist.</h1>
          </Route>
        </Switch>
        <Footer />
      </div>

    </Router>
  );
}

export default App;