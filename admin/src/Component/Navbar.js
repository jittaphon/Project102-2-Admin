import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import styled from "styled-components";

function Navbar({ className }) {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <div className={className}>
            <IconContext.Provider value={{ color: "#fff" }}>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                </div>

                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </div>
    );
}

export default styled(Navbar)`
    .navbar {
        background-color: #060b26;
        height: 80px;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .menu-bars {
        margin-left: 2rem;
        font-size: 2rem;
        background: none;
    }

    .nav-menu {
        background-color: #060b26;
        width: 250px;
        height: 100vh;
        display: flex;
        justify-content: center;
        position: fixed;
        top: 0;
        left: -100%;
        transition: 850ms;
    }

    .nav-menu.active {
        left: 0;
        transition: 350ms;
    }

    .nav-text {
        display: flex;
        justify-content: start;
        align-items: center;
        padding: 8px 0px 8px 16px;
        list-style: none;
        height: 60px;
    }

    .nav-text a {
        text-decoration: none;
        color: #f5f5f5;
        font-size: 18px;
        width: 95%;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 16px;
        border-radius: 4px;
    }

    .nav-text a:hover {
        background-color: #1a83ff;
    }

    .nav-menu-items {
        width: 100%;
    }

    .navbar-toggle {
        background-color: #060b26;
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    span {
        margin-left: 16px;
    }
`;
