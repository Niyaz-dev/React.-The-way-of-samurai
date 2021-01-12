import React from 'react';
import s from './Header.module.css'
import {Link, NavLink} from "react-router-dom";
import {BaseThunkType} from "../../redux/redux-store";
import {ThunkAction} from "redux-thunk";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/auth-selectors";
import {logout} from "../../redux/auth-reducer";


export type MapPropsType = {
}

export const Header: React.FC<MapPropsType> = (props) => {
    const {Header} = Layout;

    const isAuth = useSelector(selectIsAuth);
    const login = useSelector(selectCurrentUserLogin);

    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    return (

        <Header className="header">
            <div className="logo"/>
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1"><Link to="/users">Developers</Link></Menu.Item>
                    </Menu>
                </Col>
                <Col span={6}>
                    {isAuth
                        ? <div className={s.header__user}>
                            <span className={s.header__userLogin}>{login}</span>
                             <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                            <Button onClick={logoutCallback}>Log out</Button>
                        </div>
                        : <NavLink to={'/login'}>Login</NavLink>}
                </Col>
            </Row>

        </Header>

        // <header className={s.header}>
        //     <img src="https://is5-ssl.mzstatic.com/image/thumb/Purple124/v4/b6/c3/cb/b6c3cb54-5fd6-3d1f-7b13-255aa6e56b3e/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png" alt="" />
        //     <div className={s.loginBlock}>
        //         
        //        
        //     </div>
        // </header>
    );
}
 