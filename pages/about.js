import { Card, Col, Row } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import About from "../components/About";
import MyHeader from "../components/MyHeader";

export default function about() {
    return <Layout>
        <MyHeader keys={"3"} />
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
                    <About></About>
                </Col>
            </Row>
        </Content>
    </Layout>
}