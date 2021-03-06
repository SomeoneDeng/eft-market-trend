import { Col, Row } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import MyHeader from "../components/MyHeader";

export default function Recipes( ) {
    return <Layout>
        <MyHeader keys={"2"}/>
        <Content>
            <Row>
            <Col md={{
                    span: 12,
                    offset: 6
                  }} sm={{
                    span: 24
                  }} xs={{
                    span: 24
                  }}>
                      recipes
            </Col>
            </Row>
        </Content>
    </Layout>
}