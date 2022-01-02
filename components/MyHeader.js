import { Col, Layout, Menu, Row } from "antd";
import { Header } from "antd/lib/layout/layout";
import Router from "next/router";


export default function MyHeader(key) {
    return function a() {
      return (
        <Header theme={'light'} style={{ background:"#fff", zIndex: 1, width: '100%' }}>
        {/* <Layout>
          <Row> */}
            <Col md={{
                    span: 12,
                    offset: 6
                  }} sm={{
                    span: 24
                  }} xs={{
                    span: 24
                  }}>
              <Menu theme="light" mode="horizontal" defaultSelectedKeys={[key]}>
                <Menu.Item key="1" onClick={()=> Router.push("/")}>index</Menu.Item>
                <Menu.Item key="2" onClick={()=> Router.push("/recipes")}>recipes</Menu.Item>
                <Menu.Item key="3" onClick={()=> Router.push("/about")}>about</Menu.Item>
              </Menu>
            </Col>
          {/* </Row>
        </Layout> */}
      </Header>
    )
  }
}