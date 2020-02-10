/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from '../../redux/modules/user';

function RightMenu(props: any) {
  const user = useSelector((state: any) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser()).then((response: any) => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu style={{ backgroundColor: '#1A181F'}} mode={props.mode}>
        <Menu.Item key="mail">
          <a style={{color: 'white'}} href="/login">로그인</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a style={{color: 'white'}} href="/register">회원가입</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu style={{ backgroundColor: '#1A181F'}} mode={props.mode}>
        <Menu.Item key="logout">
          <a style={{color: 'white'}} onClick={logoutHandler}>로그아웃</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);