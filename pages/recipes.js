import Layout, { Content } from "antd/lib/layout/layout";
import MyHeader from "../components/MyHeader";

export default function Recipes( ) {
    return <Layout>
        {MyHeader('2')()}
        <Content>
            <div>recipes</div>
        </Content>
    </Layout>
}