import { Avatar, Card, Col, Divider, Layout, Row } from "antd"
import Text from "antd/lib/typography/Text"

export default function IndexItem({item}) {
    return <Card style={{ width: '100%' }} hoverable>
    <Layout style={{ backgroundColor: '#fff' }}>
      <Row>
        <Col span={2}>
          <Avatar src={item.enImg}></Avatar>
        </Col>
        <Col span={16}>
          <Text strong>{item.cnName}</Text>
        </Col>
        <Col span={4}><small>{item.cnShortName}  </small></Col>
      </Row>

      <Row>
        <Col span={24}>
          <p>最后成交的最低价格{' ' + item.price + ' ₽'}</p>
          <p>商人收购{' ' + item.traderName}价格{item.traderPrice + ' ₽'}</p>
          <p>24小时平均价格{' ' + item.price + ' ₽'}</p>
          <p>24小时价格变化{' ' + item.price + ' ₽'}</p>
          <p>7天价格变化{' ' + item.price + ' ₽'}</p>
          <Divider></Divider>
          <p><small>更新毛时{' ' + item.priceUpdated}</small></p>
        </Col>
      </Row>
    </Layout>
  </Card>
}