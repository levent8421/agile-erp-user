import React, {Component} from 'react';
import {Card, Carousel, Col, Layout, Row, Typography} from 'antd';
import './Home.less';
import ContentHeader from './ContentHeader';
import ContentFooter from './ContentFooter';
import Image1 from '../image/carousel/image1.png';
import Image2 from '../image/carousel/image2.png';
import Image3 from '../image/carousel/image3.png';

const {Title, Text} = Typography;
const {Content} = Layout;
const carouselContent = [
    {
        title: 'Title1',
        subTitle: 'SubTitle1',
        image: Image1,
    },
    {
        title: 'Title2',
        subTitle: 'SubTitle2',
        image: Image2,
    },
    {
        title: 'Title3',
        subTitle: 'SubTitle3',
        image: Image3,
    },
];
const contentCards = [
    {
        header: 'Card1',
        content: 'xxxxxx'
    },
    {
        header: 'Card2',
        content: 'xxxxxx'
    },
    {
        header: 'Card3',
        content: 'xxxxxx'
    },
    {
        header: 'Card4',
        content: 'xxxxxx'
    },
];

class Home extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <Layout className="home">
                <ContentHeader/>
                <Content>
                    <Carousel className="content-carousel" autoplay={true}>
                        {
                            carouselContent.map((item, index) => (
                                <div className="carousel-item" key={index}>
                                    <img src={item.image} alt={item.title}/>
                                    <div className="text">
                                        <h1>
                                            <span>{item.title}</span>
                                        </h1>
                                        <h2>
                                            <span>{item.subTitle}</span>
                                        </h2>
                                    </div>
                                </div>))
                        }
                    </Carousel>
                    <Row>
                        <Col span={2}/>
                        <Col span={20}>
                            <Row className="cards">
                                {
                                    contentCards.map((item, index) => (
                                        <Col span={6} key={index}>
                                            <Card title={item.header} className="card-item">
                                                <p>{item.content}</p>
                                                <p>{item.content}</p>
                                                <p>{item.content}</p>
                                                <p>{item.content}</p>
                                                <p>{item.content}</p>
                                                <p>{item.content}</p>
                                            </Card>
                                        </Col>
                                    ))
                                }
                            </Row>
                            <div>
                                <Title level={1}>Title</Title>
                                <Text>Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,</Text>
                                <br/>
                                <Text>Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,</Text>
                                <Text>Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,</Text>
                                <Text>Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,</Text>
                                <Text>Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,</Text>
                                <Text>Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,</Text>
                                <Text>Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,</Text>
                                <Text>Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,</Text>
                                <Text>Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,Text,</Text>
                            </div>
                        </Col>
                        <Col span={2}/>
                    </Row>
                </Content>
                <ContentFooter/>
            </Layout>
        );
    }
}

export default Home;
