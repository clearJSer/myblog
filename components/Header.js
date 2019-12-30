import React, { useState, useEffect } from 'react';
import '../static/style/components/header.css';
import { Row, Col, Menu, Icon } from 'antd';
import { MenuItem } from 'rc-menu';
import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Head from 'next/head';
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
			<Head>
				<meta name="description" content="进击的程序员,分享工作生活感悟,帮助程序员全面提升自己"></meta>
				<meta name="keywords" content="fire1024.com,进击的程序员,前端开发,个人博客,编程"></meta>
      </Head>
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={13}>
          <div className="logo"><img src="../static/images/logo-3.png" width="160px"/></div>
          {/* <span className="logo-text">进击的程序员</span> */}
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
