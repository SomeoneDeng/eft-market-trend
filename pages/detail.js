import { Button, Card, Col, Layout, Row } from "antd";
import axios from "axios";
import { Component } from "react";
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { ArrowLeftOutlined } from "@ant-design/icons/lib/icons";
import Link from "next/link";
const TREND_URL = 'https://mp.soulofcinder.xyz/eft/api/itemTrend?uid='

class Detail extends Component {
    static async getInitialProps({ query }) {
        var resp = await axios.get(TREND_URL + query.uid);
        // console.log("--> ", resp)
        return {
          name: query.name,
          uid: query.uid,
          items: resp.data
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
                <Card title={this.state.name} style={{minHeight: '100vh'}}
                    extra={<Link href={"/"}><Button><ArrowLeftOutlined></ArrowLeftOutlined></Button></Link>}
                >
                    <ReactECharts option={this.state.option}></ReactECharts>
                </Card>
            </Col>
            </Row>
        </Layout>
    }
}

export default Detail