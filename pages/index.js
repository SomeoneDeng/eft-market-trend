import { Avatar, Button, Card, Col, Divider, List, Row, Skeleton, Space, Tag } from 'antd'
import Meta from 'antd/lib/card/Meta'
import Search from 'antd/lib/input/Search'
import Layout, { Content, Footer } from 'antd/lib/layout/layout'
import Item from 'antd/lib/list/Item'
import axios from 'axios'
import { Component, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import MyHeader from '../components/MyHeader'

const SEARCG_URL = "https://mp.soulofcinder.xyz/eft/api/mainSearch"

export default class Home extends Component {

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

      page_num: 1,
      page_size: 30,
      searchText: '',
      selectedTag: ''
    }
  }

  loadMoreData = () => {

    if (this.state.loading) return

    this.setState({loading: true})
    // const {tags, page_num, page_size, searchText, items} = this.state

    console.log(this.state)

    axios.get(SEARCG_URL 
      + "?tag=" + this.state.selectedTag
    + "&page_num=" + this.state.page_num 
    + "&page_size=" + this.state.page_size 
    + "&item_name=" + this.state.searchText 
    + "&sortd=desc&sort=price").then(resp => {

      this.setState({loading: false})

      var t = this.state.items

      if (resp.data == null ||resp.data.length == 0) {
        this.setState({
          page_num: 1,
          items: [],
          hasMore: false
        })
        return
      }

      resp.data.forEach(i => t.push(i))

      this.setState({
        // page_num: this.state.page_num + 1,
        items: t,
        hasMore: resp.data.length === this.state.page_size
      })
    })
  }

  componentDidMount() {
    this.loadMoreData('')
  }

  tagClick = (t) => {
    var that = this
    setTimeout(function () {
      that.setState({page_num: 1, page_size: 30, hasMore: true, items: []})
      that.setState({selectedTag: t.value == that.state.selectedTag ? '' : t.value})
      console.log("tag---> ", this.state)
      that.loadMoreData()
    }, 0)
  }


  render() {

    const {tags, items, hasMore} = this.state

    return (
      <Layout>
        {MyHeader('1')()}
        <Content style={{ minHeight: '100vh' }}>
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
                {/* <Meta title={"search"}></Meta> */}
                <Row>
                  <Col md={{
                    span: 18,
                    offset: 3
                  }} sm={{
                    span: 24
                  }} xs={{
                    span: 24
                  }}>
                    <Search onChange={(a)=> {
                      var that = this
                      setTimeout(function () {
                        that.setState({searchText: a.target.value, page_num: 1, page_size: 30, hasMore: true, items: []})
                        that.loadMoreData()
                      }, 0)
                    }} size='large' placeholder='ruaruarua~~' width={'60'} enterButton={<Button style={{color: 'white', backgroundColor: 'teal'}} onClick={this.loadMoreData}>搜索</Button>}></Search>
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
                      onClick={()=> this.tagClick(tag)} 
                    color={tag.value === this.state.selectedTag ? 'teal' : 'default'} 
                    style={{ cursor: 'pointer' }}>
                      {tag.name}
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
                    <InfiniteScroll
                    dataLength={items.length}
                    next={this.loadMoreData}
                    hasMore={hasMore}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    >
                    <List
                      
                      dataSource={items}
                      renderItem={item => (
                        <List.Item key={item.id}>
                          <List.Item.Meta
                            avatar={<Avatar src={item.enImg} />}
                            title={item.cnName}
                            description={item.cnShortName}
                          />
                          <div>
                            
                          </div>
                        </List.Item>
                      )}
                    />
                    </InfiniteScroll>
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
