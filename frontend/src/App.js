import './App.css';

import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './layout/Landing';
import Register from './pages/register';
import Login from './pages/login';
import EditProfile from './pages/Profile';
import Recipe from './pages/recipe';
import EditRecipe from './pages/editRecipe';
import Comment from './components/comments/CommentBox';
import Footer from './layout/Footer';
import SearchingResults from './pages/searchingResults';

function App() {
  return (
    <Fragment>
      <Router>
        <Fragment>
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profile/:userId' component={EditProfile} />
          <Route exact path='/profile/:userId/following' />
          <Route exact path='/profile/:userId/followers' />
          <Route exact path='/recipe/create' component={EditRecipe} />
          <Route exact path='/recipe/:rUid/edit' component={EditRecipe} />
          <Route exact path='/recipe/:rUid/view' component={Recipe} />
          <Route exact path='/search/:kWords' component={SearchingResults} />
          <Route exact path='/comment' component={Comment} />
          {/* <section className='container'>
            <Switch>
              <Route exact path='/Register' component={Register} />
              <Route exact path='/Login' component={Login} />
            </Switch>
          </section> */}
        </Fragment>
      </Router>
      <Footer />
    </Fragment>
  );
}

export default App;
