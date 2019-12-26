import React, { useState } from 'react';
import Head from 'next/head';
import { Row, Col, List, Icon } from 'antd';
import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import Link from 'next/link';
import '../static/style/pages/index.css';
import axios from 'axios';
import servicePath from '../config/apiUrl';

import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

const Home = list => {
  const [mylist, setMylist] = useState(list.data);
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    },
  });
  return (
    <div>
      <Head>
        <title>编程成长之路</title>
      </Head>
      <Header />
      <Row type="flex" justify="center" className="comm-main">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span>
                    <Icon type="calendar" /> {item.addTime}
                  </span>
                  <span>
                    <Icon type="folder" /> {item.typeName}
                  </span>
                  <span>
                    <Icon type="fire" /> {item.view_count}人
                  </span>
                </div>
                <div className="list-context" dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}></div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={8} lg={6} xl={5}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  );
};
Home.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    axios(servicePath.getArticleList).then(res => {
      console.log('远程获取数据结果:', res);
      resolve(res.data);
    });
  });

  return await promise;
};
export default Home;
