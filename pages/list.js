import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Row, Col, List, Icon, Breadcrumb } from 'antd';
import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';

import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';

import Link from 'next/link';

import servicePath from '../config/apiUrl';
import axios from 'axios';

const ArticleList = list => {
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
  const [mylist, setMylist] = useState(list.data);
  useEffect(() => {
    setMylist(list.data);
  });
  return (
    <div>
      <Head>
        <title>Hello Fire</title>
      </Head>
      <Header />
      <Row type="flex" justify="center" className="comm-main">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a> {item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span>
                      <Icon type="calendar" />
                      {item.addTime}
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
          </div>
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
ArticleList.getInitialProps = async context => {
  let id = context.query.id;
  const promise = new Promise(reslove => {
    axios(servicePath.getListById + id).then(res => {
      reslove(res.data);
    });
  });

  return await promise;
};
export default ArticleList;
