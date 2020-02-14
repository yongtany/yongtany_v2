import React from 'react';

import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props: any) {
  const { user } = props;
  

  return (
    <Menu style={{ color: 'white', backgroundColor: '#1A181F'}} mode={props.mode}>
      <Menu.Item key="mail">
        <Link style={{color: 'white'}} to="/">
          <Icon type="home" />
        </Link>
      </Menu.Item>
      {user.userData && !user.userData.isAuth ? 
        null
      :  
      <SubMenu title={<span>블로그</span>}>
      <MenuItemGroup title="블로그">
        <Menu.Item key="setting:1">
          <Link to="/createPost">
            포스트 생성
          </Link>
        </Menu.Item>
      </MenuItemGroup>
    </SubMenu>
    }
  </Menu>
  )
}

export default LeftMenu;