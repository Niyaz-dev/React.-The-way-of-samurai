import React from 'react';
import './App.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Link, NavLink, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import Music from './components/Music/Music';
import {LoginPage} from "./components/Login/LoginPage";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";
import {compose} from "redux";
import store, {AppStateType} from "./redux/redux-store";
import {withSuspense} from "./hoc/WithSuspence";
import {Users} from "./components/Users/Users";
import {UsersPage} from "./components/Users/UsersContainer";


import {Layout, Menu, Breadcrumb, Avatar, Row, Col} from 'antd';
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons';
import s from "./components/Navbar/Navbar.module.css";
import {Header} from "./components/Header/Header";

const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;


const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ChatPage = React.lazy(() => import("./pages/chat/ChatPage"));

type PropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends React.Component<PropsType & DispatchPropsType> {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (


            <Layout>
                <Header/>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                // defaultSelectedKeys={['5']}
                                // defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined/>} title="My profile">
                                    <Menu.Item key="1"><Link to="/profile" >Profile</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to="/dialogs" >Messages</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                                    <Menu.Item key="3"><Link to="/users" >Users</Link></Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" icon={<NotificationOutlined/>} title="Content">
                                    <Menu.Item key="4"> <Link to="/news" >News</Link></Menu.Item>
                                    <Menu.Item key="5"><Link to="/settings" >Settings</Link></Menu.Item>
                                    <Menu.Item key="6"><Link to="/music" >Music</Link></Menu.Item>
                                    <Menu.Item key="7"><Link to="/chat" >Chat</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Switch>
                                <Route exact path="/" render={() => <Redirect to={'/profile'}/>}/>
                                <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
                                <Route path="/dialogs" render={withSuspense(DialogsContainer)}/>
                                <Route path="/users" render={() => <UsersPage pageTitle={"Самураи"}/>}/>
                                <Route path="/news" component={News}/>
                                <Route path="/settings" component={Settings}/>
                                <Route path="/music" component={Music}/>
                                <Route path="/login" component={LoginPage}/>
                                <Route path="/chat" component={withSuspense(ChatPage)}/>
                                <Route path="*" render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>




            // <div className="app-wrapper">
            //     <HeaderContainer/>
            //     <Navbar/>
            //     <div className="app-wrapper-content">

            //     </div>
            // </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp: React.FC = () => {
    return <Provider store={store}>
        <BrowserRouter>
            <AppContainer/>
        </BrowserRouter>
    </Provider>
}

export default SamuraiJSApp;