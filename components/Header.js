import React from 'react';
import '../static/style/components/header.css'
import {Row, Col, Menu, Icon} from 'antd'
import { MenuItem } from 'rc-menu';
const Header = () => {
	return (
		<header className="header">
			<Row type="flex" justify="center">
				<Col xs={24} sm={24} md={10} lg={15} xl={12}>
					<span className="logo">Fire1024.com</span>
					<span className="logo-text">进击的程序员，一起成长</span>
				</Col>
				<Col xs={0} sm={0} md={14} lg={8} xl={6}>
					<Menu mode="horizontal">
						<MenuItem key="home">
							<Icon type="home"/>
							首页
						</MenuItem>
						<MenuItem key="code">
							<Icon type="home"/>
							技术
						</MenuItem>
						<MenuItem key="money">
							<Icon type="home"/>
							财经
						</MenuItem>
						<MenuItem key="think">
							<Icon type="home"/>    
							思考
						</MenuItem>
					</Menu>
				</Col>
			</Row>
		</header>
	)
}
export default Header;