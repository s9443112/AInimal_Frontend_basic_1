import React from 'react'
import * as request from './request/index'
import { List, Avatar, Layout, } from 'antd';
import { ManOutlined , WomanOutlined , StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Header, Footer, Content } = Layout;


export default class App extends React.Component {


  render() {

    return (
      <Layout style={{backgroundColor: 'white'}}>
        <Header style={{color:'white'}}>聊天室</Header>
        <Content><ChatBox /></Content>
        <Footer>AInimal 工程招募</Footer>
      </Layout>
    )
  }
}


class ChatBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      msg_list: []
    }
  }

  async componentDidMount() {
    let data = await request.GetFriendList()
    console.log(data)
    this.setState({ msg_list: data })
  }

  render() {
    let { msg_list } = this.state
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={msg_list}

        renderItem={item => (
          <>
          <List.Item
            key={item.title}
            actions={[
              <p>{item.last_message_timestamp}</p>
              // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}

          >
            <List.Item.Meta
              avatar={<Avatar style={{color: item.gender === 'male' ? 'blue':'red'}}>{item.gender === 'male' ? <ManOutlined /> : <WomanOutlined />}</Avatar>}
              title={<a href={item.href}>{item.nickname}</a>}
              description={item.sign}
            />
            {item.last_message}
          </List.Item>
          <hr/>
          </>
        )}
      />
    )
  }

}
