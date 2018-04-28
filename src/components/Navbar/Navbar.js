import React from 'react';
import { Menu, Image } from 'semantic-ui-react';
import Logo from '../../logo.svg';
import artistlogo from '../../artists-logo.png';
import '../../styles/Navbar.css';

const Navbar=()=>(
  <Menu>
    <Menu.Menu>
      <Menu.Item>
        <Image src={artistlogo} size="tiny" centered  alt="artists" />
        <img src={Logo} alt="logo" className="Navbar-logo"/>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);
export default Navbar;
