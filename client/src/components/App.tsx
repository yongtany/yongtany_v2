import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from '../components/hoc/auth';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import CreatePostPage from '../pages/CreatePostPage';
import PostDetailPage from '../pages/PostDetailPage';
import PostListPage from '../pages/PostListPage';

function App () {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Navbar />
      <div style={{ minHeight: 'calc(95vh - 80px)', backgroundColor: '#1A191F'}}>
        <Switch >
          <Route exact path="/" component={Auth(PostListPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/createPost" component={Auth(CreatePostPage, true)} />
          <Route exact path="/post/:postId" component={Auth(PostDetailPage, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}


export default App;
