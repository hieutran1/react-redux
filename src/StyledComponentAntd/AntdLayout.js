import React, { Component} from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './AntdLayout.css';

const { Header, Content, Footer } = Layout;

export function LayoutAnt(){
  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', border: '1px solid yellow' }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64, border: '1px solid green' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24 }} contentEditable>Content</div>
      </Content>
      <Footer style={{ textAlign: 'center', zIndex: 1, width: '100%', bottom: 0, border: '1px solid blue'  }}>
        Ant Design ©2016 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export class App extends Component {
  render() {
    return (
      <LayoutAnt />
    );
  }
}