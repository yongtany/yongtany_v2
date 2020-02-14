import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import { Drawer, Button, Icon } from 'antd';
import './Navbar.css';

function NavBar() {
  const [visible, setVisible] = useState(false)
  const user = useSelector((state: any) => state.user);

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu">
      <div className="menu__logo">
        <Link to="/">
          &lt;Yongtany /&gt;
        </Link>
      </div>
      
      <div className="menu__container">
        {
        user.userData && <>
         <div className="menu_left">
          <LeftMenu mode="horizontal" user={user} />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" user={user} />
        </div>
        </>
      }
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="Menu"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >{
          user.userData && 
          <><LeftMenu mode="inline"  user={user} />
          <RightMenu mode="inline" user={user} />
          </>
        }
          
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar