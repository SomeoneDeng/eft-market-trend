import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons/lib/icons'
import { Avatar, Button, Card, Col, List, Row, Tag } from 'antd'
import ButtonGroup from 'antd/lib/button/button-group'
import Search from 'antd/lib/input/Search'
import Layout, { Content, Footer } from 'antd/lib/layout/layout'
import Text from 'antd/lib/typography/Text'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Component, useEffect } from 'react'
import MyHeader from '../components/MyHeader'

React.useLayoutEffect = useEffect

const SEARCG_URL = "https://mp.soulofcinder.xyz/eft/api/mainSearch"

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tags: [
        {
          name: "钥匙",
          value: "Keys",
          selected: false
        },
        {
          name: "药品",
          value: "Meds",
          selected: false
        },
        {
          name: "交易物",
          value: "Barter",
          selected: false
        },
        {
          name: "容器",
          value: "Containers",
          selected: false
        },
        {
          name: "供给",
          value: "Provisions",
          selected: false
        },
        {
          name: "抑制器",
          value: "Suppressors",
          selected: false
        },
        {
          name: "防具",
          value: "Gear",
          selected: false
        },
        {
          name: "武器",
          value: "Weapon",
          selected: false
        },
        {
          name: "瞄具",
          value: "Sights",
          selected: false
        },
        {
          name: "武器部件",
          value: "Weapon_parts",
          selected: false
        },
        {
          name: "弹药",
          value: "Ammo",
          selected: false
        },
        {
          name: "弹药包",
          value: "Ammo_boxes",
          selected: false
        },
        {
          name: "弹匣",
          value: "Magazines",
          selected: false
        },
        {
          name: "战术设备",
          value: "Tactical_devices",
          selected: false
        },
        {
          name: "货币",
          value: "Currency",
          selected: false
        },
        {
          name: "特殊部件",
          value: "Special_equipment",
          selected: false
        },
        {
          name: "非功能性物品",
          value: "Not_functional",
          selected: false
        },
        {
          name: "地图",
          value: "Maps",
          selected: false
        },
      ],
      items: [],
      hasMore: true,

      loading: false,

      page_num: props.page_num || 1,
      page_size: 30,
      searchText: props.item_name || '',
      selectedTag: props.tag || ''
    }
  }

  static async getInitialProps({ query }) {
    console.log("req--> ", query)
    var resp = await axios.get(SEARCG_URL
      + "?tag=" + (query.tag || '')
      + "&page_num=" + (query.page_num || 1)
      + "&page_size=" + (query.page_size || 30)
      + "&item_name=" + (query.item_name || '')
      + "&sortd=desc&sort=price");

    return {
      tag: query.tag,
      page_num: query.page_num,
      page_size: query.page_size,
      item_name: query.item_name,
      items: resp.data == undefined || resp.data == null ? [] : resp.data
    };
  }

  loadMoreData = (tag) => {
    if (tag == this.state.selectedTag) {
      tag = ''
    }

    return "/"
      + "?tag=" + ((tag != undefined || tag != null) ? tag : this.state.selectedTag)
      + "&page_num=" + parseInt(this.state.page_num)
      + "&page_size=" + this.state.page_size
      + "&item_name=" + this.state.searchText
      + "&sortd=desc&sort=price"
  }

  loadMoreDataTag = (tag) => {
    if (tag == this.state.selectedTag) tag = ''
    return "/"
      + "?tag=" + tag
      + "&page_num=" + 1
      + "&page_size=" + 30
      + "&item_name=" + this.state.searchText
      + "&sortd=desc&sort=price"
  }

  loadNextData = () => {
    return "/"
      + "?tag=" + this.state.selectedTag
      + "&page_num=" + (parseInt(this.state.page_num) + 1)
      + "&page_size=" + this.state.page_size
      + "&item_name=" + this.state.searchText
      + "&sortd=desc&sort=price"
  }
  loadPrevData = () => {
    return "/"
      + "?tag=" + this.state.selectedTag
      + "&page_num=" + (this.state.page_num == 1 ? 1 : parseInt(this.state.page_num) - 1)
      + "&page_size=" + this.state.page_size
      + "&item_name=" + this.state.searchText
      + "&sortd=desc&sort=price"
  }

  render() {

    const { tags } = this.state

    return (
      <Layout>
        <MyHeader keys={"1"} />
        <Content style={{ minHeight: '100vh', marginTop: '4px' }}>
          <Row>
            <Col md={{
              span: 12,
              offset: 6
            }} sm={{
              span: 24
            }} xs={{
              span: 24
            }}>
              <Card>
                <Row>
                  <Col md={{
                    span: 18,
                    offset: 3
                  }} sm={{
                    span: 24
                  }} xs={{
                    span: 24
                  }}>
                    <Search defaultValue={this.state.searchText} onChange={(a) => {
                      var that = this
                      setTimeout(function () {
                        that.setState({ searchText: a.target.value, page_num: 1, page_size: 30, hasMore: true, items: [] })
                      }, 0)
                    }} size='large' placeholder='ruaruarua~~' width={'60'} enterButton={
                      <Button color='teal'><a color='teal' href={this.loadMoreData()}>
                        搜索
                      </a>  </Button>
                    }></Search>
                  </Col>
                </Row>
                <Row>
                  <Col md={{
                    span: 18,
                    offset: 3
                  }} sm={{
                    span: 24
                  }} xs={{
                    span: 24
                  }}>
                    <div style={{ marginTop: '20px' }}>{tags.map(tag => <Tag
                      key={tag.name}
                      color={tag.value === this.state.selectedTag ? 'teal' : 'default'}
                      style={{ cursor: 'pointer' }}>
                      <a href={this.loadMoreDataTag(tag.value)}>{tag.name}</a>
                    </Tag>)}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={{
                    span: 18,
                    offset: 3
                  }} sm={{
                    span: 24
                  }} xs={{
                    span: 24
                  }}>
                    <List
                      split={false}
                      dataSource={this.props.items}
                      renderItem={item => (
                        <List.Item key={item.id} className='' style={{ backgroundColor: '#fff', cursor: 'pointer', paddingBottom: '0' }}>
                          <Link href={"/detail?uid=" + item.uid + "&name=" + item.cnName}>
                          <Card style={{ width: '100%' }} hoverable>
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
                                  <p>价格：{item.price + ' ₽'}</p>
                                  <p>毛时：{item.priceUpdated}</p>
                                </Col>
                                <Col span={24}>

                                </Col>
                              </Row>
                            </Layout>
                          </Card>
                          </Link>
                        </List.Item>
                      )}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    <ButtonGroup style={{ width: '100%', marginTop: '8px' }}>
                      <Button block><a href={this.loadPrevData()}><ArrowLeftOutlined></ArrowLeftOutlined></a></Button>
                      <Button block><a href={this.loadNextData()}><ArrowRightOutlined></ArrowRightOutlined></a></Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
    )
  }
}

function withRouter(props) {
  const router = useRouter()
  console.log(props)
  return <Home {...props} router={router}></Home>
}

export default Home