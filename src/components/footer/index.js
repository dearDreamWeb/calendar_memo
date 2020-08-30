import React, { useEffect, useState } from 'react';
import "./index.scss";
import { WingBlank } from 'antd-mobile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBookmark } from '@fortawesome/fontawesome-free-solid'

const Footer = props => {
    const [locationPath, setLocationPath] = useState("");  //当前路径
    const lists = [
        {
            path: "/",
            icon: faHome,
            text: "首页"
        },
        {
            path: "/undone",
            icon: faBookmark,
            text: "待办"
        }
    ];


    useEffect(() => {
        setLocationPath(props.location.pathname);
    }, [])

    // 跳转页面
    const jumpPage = path => {
        props.history.push(path);
        setLocationPath(path);
    }

    return (
        <footer className="footer">
            <WingBlank>
                <ul className="lists">
                    {lists.map((item, index) => (
                        <li
                            key={index}
                            className={`lists_item ${
                                locationPath == item.path
                                    ? "selected"
                                    : ""
                                }`}
                            onClick={() => jumpPage(item.path)}
                        >
                            <FontAwesomeIcon className="icon" icon={item.icon} />
                            <p>{item.text}</p>
                        </li>
                    ))}
                </ul>
            </WingBlank>
        </footer>
    )
}
export default Footer;