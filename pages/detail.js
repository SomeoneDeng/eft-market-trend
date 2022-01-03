import { Button, Card, Col, Image, Layout, List, Row } from "antd";
import axios from "axios";
import { Component } from "react";
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { ArrowLeftOutlined } from "@ant-design/icons/lib/icons";
import Link from "next/link";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
const TREND_URL = 'https://mp.soulofcinder.xyz/eft/api/itemTrend?uid='
const RECIPE_URL = 'https://mp.soulofcinder.xyz/eft/api/recipes?uid='

class Detail extends Component {
    static async getInitialProps({ query }) {
        var resp = await axios.get(TREND_URL + query.uid);
        // console.log("--> ", resp)


        var recipeResp = await axios.get(RECIPE_URL + query.uid).catch(e => console.log("404-> " + RECIPE_URL + query.uid))

        // console.log(/"detail--> ", recipeResp?.data[0])

        return {
          name: query.name,
          uid: query.uid,
          items: resp.data,
          recipe: recipeResp == undefined ? [] : recipeResp.data
        }
    }

    constructor(props) {
        super(props)
        // console.log(props.items)
        this.state = {
            name: props.name,
            uid: props.uid,
            items: props.items,
            option: {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                    }
                },
                legend: {},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                //   boundaryGap: [0, 0.01]
                    data: this.props.items.map(function (a) {
                    a = new Date(a.updated)
                    return a.toLocaleDateString() + " " + a.toLocaleTimeString()
                    }),
                    axisLabel: { //  如果这个字段不设置，echarts会根据屏宽及横坐标数据自动给出间隔
                    // interval: 30, // 间隔长度，可自定义（如果是时间格式，echarts会自动处理）
                    rotate: 40 // 横坐标上label的倾斜度
                    },
                },
                yAxis: {
                    type: 'value',
                    
                },
                series: [
                    {
                    name: '价格变化',
                    type: 'line',
                    showSymbol: true,
                    smooth: true,
                    data: this.props.items.map(a => a.price),
                    // areaStyle: {
                    //     color: echarts.graphic.LinearGradient(0,0,0,1, [{
                    //     offset: 0,
                    //     color: '#d276a3'
                    //     },{
                    //     offset: 1,
                    //     color: '#0eb0c9'
                    //     }])
                    // }
                    }
                ]
            }
        }
    }



    render() {
        return <Layout>
            <Row>
            <Col md={{
                span: 18,
                offset: 3
                }} sm={{
                span: 24
                }} xs={{
                span: 24
                }}>
                <Card title={<Title level={2}>{this.props.name}</Title>} style={{minHeight: '100vh'}}
                    extra={<Link href={"/"}><Button><ArrowLeftOutlined></ArrowLeftOutlined></Button></Link>}
                >
                    <ReactECharts option={this.state.option}></ReactECharts>


                    <Row>
                        <Col md={{
                          span: 24, offset: 0
                        }} sm={{span: 24, offset: 0  }} xs={{span: 24, offset: 0  }} xl={{span: 12, offset: 6   }}>
                        {
                        this.props.recipe.length > 0 ? 
                        <List dataSource={this.props.recipe} renderItem={(item, index) => {
                            return <Card title={<Title level={4}>{'配方 '+(index + 1)}</Title>} extra={'更新毛时：' + item.updated}>
                                <Row>
                                    <Col span={24}><Title level={5}>材料</Title></Col>
                                    {
                                        item.input.map(i => <a key={i.uid} href={"/detail?uid="+i.uid + "&name="+i.cnName}>
                                            <div style={{width: '96px', marginRight: '8px'}}>
                                            <Image style={{borderRadius: '4px', width: '96px'}} src={i.enImg}></Image>
                                            <p>{i.cnName + '(' +  i.amount + ')'}</p>
                                            </div>
                                        </a>)
                                    }
                                    <Col span={24}><Title level={5}>耗时</Title></Col>
                                    <Col span={24}><Text>{item.time}</Text></Col>
                                    <Col span={24}><Title level={5}>产出</Title></Col>
                                    {
                                        <a key={item.output.uid} href={"/detail?uid="+item.output.uid + "&name="+item.output.cnName}>
                                            <div style={{width: '96px', marginRight: '8px'}}>
                                            <Image style={{borderRadius: '4px', width: '96px'}} src={item.output.enImg}></Image>
                                            <p>{item.output.cnName + '(' +  item.output.amount + ')'}</p>
                                            </div>
                                        </a>
                                    }
                                    <Col span={24}><Title level={5}>需求</Title></Col>
                                    {
                                        <Text>{item.facility.name}<strong>{' ' + item.facility.level}</strong></Text>
                                    }
                                    <Col span={24}><Title level={5}>市场</Title></Col>
                                    {
                                        "投入(₽)：" + 
                                        item.input.map(i => i.price + "x" + i.amount).join(" + ") + " = "
                                        + item.input.map(i => i.price * i.amount).reduce((a, b) => a +  b, 0)
                                        
                                    }
                                    <br></br>
                                    {
                                        "产出(₽)：" + 
                                        item.output.price + "x" + item.output.amount + "=" + item.output.price * item.output.amount
                                    }
                                    <br></br>
                                    {
                                         "税收(₽)：" + 
                                        item.output.fee + "x" + item.output.amount + "=" + item.output.fee * item.output.amount
                                    }
                                </Row>
                            </Card>
                        }}>
                        </List> : ''}
                        </Col>
                    </Row>

                    
                </Card>
            </Col>
            </Row>
        </Layout>
    }
}

export default Detail