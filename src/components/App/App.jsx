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

import AboutPage from '../AboutPage/AboutPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import Resources from '../Resources/Resources';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
//IMPORTING ALL COMPONENTS HERE TO TEST THEY WORK CORRECTLY
import AddResourceForm from '../AddResourceForm/AddResourceForm';
import AddUserForm from '../AddUserForm/AddUserForm';
import AllEventsDetails from '../AllEventsDetails/AllEventsDetails';
import AllEventsList from '../AllEventsList/AllEventsList';
import AllEventsListItems from '../AllEventsListItems/AllEventsListItems';
import AllUserListItems from '../AllUserListItems/AllUserListItems';
import AllUsersDetails from '../AllUsersDetails/AllUsersDetails';
import AllUsersList from '../AllUsersList/AllUsersList';
import Calendar from '../Calendar/Calendar';
import Drawers from '../Drawer/Drawer';
import EditUser from '../EditUser/EditUser';
import EventDetails from '../EventDetails/EventDetails';
import EventList from '../EventList/EventList';
import EventListItems from '../EventListItems/EventListItems';
import EventRegForm from '../EventRegForm/EventRegForm';
import MyEventsList from '../MyEventsList/MyEventsList';
import NewEventForm from '../NewEventForm/NewEventForm';
import EventAttendees from '../EventAttendees/EventAttendees';
// import QSClogo from '../QSClogo/QSClogo';
//END OF NEW COMPONENTS
import './App.css';
import MyEventsListItems from '../MyEventsListItems/MyEventsListItems';
import EditProfilePage from '../EditProfilePage/EditProfilePage';

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
 
          {/* Visiting localhost:3000/about will show the about page. */}
          {/* <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/AboutPage"
          >
            <AboutPage />
          </Route> */}

          {/* if the usertype is 5 (admin??) then redirect upon login to the AllEventsPage, otherwise ProfilePage */}
          <ProtectedRoute exact path="/home">
            {user.userType == 5 ?
            <Redirect to="/allEventsList" />
            :
            <ProfilePage />}           
          </ProtectedRoute>

          {/* Chris moved these two up here */}
            <ProtectedRoute exact path='/alleventslist/:id/details'>
              <AllEventsDetails/>
            </ProtectedRoute>

            <ProtectedRoute exact path='/AllEventsList'>
              <AllEventsList/>
            </ProtectedRoute>
     
          <ProtectedRoute exact path='/allusers/:id/edit'>
              <EditUser/>
          </ProtectedRoute>

          <ProtectedRoute exact path='/feedback'>
              <Feedback/>
          </ProtectedRoute>

          <ProtectedRoute exact path = "/info">
            <Resources />
          </ProtectedRoute>

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
            path="/registration/:pw"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/home"/>
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          {/* <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route> */}

          <ProtectedRoute exact path='/EventList'>
              <EventList/>
          </ProtectedRoute>

          <ProtectedRoute exact path='/EventDetails/event/:id'>
              <EventDetails/>
          </ProtectedRoute>

          <ProtectedRoute exact path='/NewEventForm'>
              <NewEventForm/>
          </ProtectedRoute>

          <ProtectedRoute exact path = '/AllEventsList/attendees/event/:id'>
              <EventAttendees/>
          </ProtectedRoute>

          <ProtectedRoute exact path='/AllEventsList'>
              <AllEventsList/>
          </ProtectedRoute>

          <ProtectedRoute exact path='/allusers'>
              <AllUsersList/>
              </ProtectedRoute>

          <ProtectedRoute exact path='/AllUsersDetails/:id'>
            <AllUsersDetails/>
          </ProtectedRoute>
              
          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>

{/* IMPORTING ALL COMPONENTS TO TEST */}
            
            

            <Route exact path='/home/:id/edit'>
              <EditProfilePage/>
            </Route>
            <Route exact path='/AddResourceForm'>
              <AddResourceForm/>
            </Route>
            <Route exact path='/AddUserForm'>
              <AddUserForm/>
              </Route>

              <Route exact path='/AllEventsDetails'>
              <AllEventsDetails/>
              </Route>


              <Route exact path='/AllEventsListItems'>
              <AllEventsListItems/>
              </Route>
              <Route exact path='/AllUserListItems'>
              <AllUserListItems/>
              </Route>    
              <Route exact path='/Calendar'>
              <Calendar/>
              </Route>
              <Route exact path='/Drawers'>
              <Drawers/>
              </Route>
              <Route exact path='/EventListItems'>
              <EventListItems/>
              </Route>
              <Route exact path='/EventRegForm'>
              <EventRegForm/>
              </Route>
              <Route exact path='/MyEventsList'>
              <MyEventsList/>
              </Route>
              <Route exact path='/MyEventsListItems'>
              <MyEventsListItems/>
              </Route>

              <Route exact path='/Resources'>
                <Resources/>
              </Route>
{/* END NEW COMPONENTS */}
    </Router>
  );
}

export default App;
