import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from '../components/hoc/auth';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import CreatePostPage from '../pages/CreatePostPage';
import PostDetailPage from '../pages/PostDetailPage';
import LandingPage from '../pages/LandingPage';
import LikePost from '../pages/LikePostPage';

function App () {
  return (
    <Suspense fallback={(<div style={{ color: 'white'}}>Loading...</div>)}>
      <Navbar />
      <div style={{ minHeight: 'calc(95vh - 80px)', backgroundColor: '#1A191F'}}>
        <Switch >
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/createPost" component={Auth(CreatePostPage, true)} />
          <Route exact path="/post/:postId" component={Auth(PostDetailPage, null)} />
          <Route exact path="/likePost" component={Auth(LikePost, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}


export default App;
