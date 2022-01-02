import { Col, Layout, Menu, Row, Space } from "antd";
import { Head } from "next/document";
import { Header } from "antd/lib/layout/layout";
import Router from "next/router";


class MyHeader extends Head {

  constructor(props) {
    super(props)
  }

  render() {
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
              <Menu theme="light" mode="horizontal" defaultSelectedKeys={[this.props.keys]}>
                <Menu.Item key="1" onClick={()=> Router.push("/")}>首页</Menu.Item>
                <Menu.Item key="2" onClick={()=> Router.push("/recipes")}>配方</Menu.Item>
                <Menu.Item key="3" onClick={()=> Router.push("/about")}>关于</Menu.Item>
              </Menu>
            </Col>
          {/* </Row>
        </Layout> */}
      </Header>
    )
  }
}

export default MyHeader;