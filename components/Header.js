import React, { useState, useEffect } from 'react';
import '../static/style/components/header.css';
import { Row, Col, Menu, Icon } from 'antd';
import { MenuItem } from 'rc-menu';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import servicePath from '../config/apiUrl';
const Header = () => {
  const [navArray, setNavArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = axios.get(servicePath.getTypeInfo).then(res => {
        setNavArray(res.data.data);
        return res.data.data;
      });
    };
    fetchData();
	}, []);
	const handleClick = (e) => {
		if(e.key == 0) {
			Router.push('/')
		}else {
			Router.push('/list?id='+e.key)
		}
	}
  return (
    <header className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="logo">Fire1024</span>
          <span className="logo-text">进击的程序员</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal"  onClick={handleClick}>
            <MenuItem key="0">
              <Icon type="home" theme="twoTone"/>
              首页
            </MenuItem>
            {navArray.map(item => {
              return (
                <Menu.Item key={item.id}>
									<Icon type={item.icon} theme="twoTone" />
                  {item.typeName}
                </Menu.Item>
              );
            })}
          </Menu>
        </Col>
      </Row>
    </header>
  );
};
export default Header;
