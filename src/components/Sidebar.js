import React, { Component } from 'react';

class Sidebar extends Component {
    render() {
        return (
            <div className="s-layout">
                <div className="s-layout__sidebar">
                    <a className="s-sidebar__trigger" href="#0">
                        <i className="fa fa-bars" />
                    </a>
                    <nav className="s-sidebar__nav">
                        <header>
                            <h1 style={{ display: 'inline-block' }}>N-MAPS</h1>
                            <span style={{}}> coventry</span>
                        </header>
                        <ul>
                            <li>
                                <div className="s-sidebar__nav-link">
                                    <i class="fa fa-flag" />
                                    <em>POI</em>
                                    <div className="slideThree">
                                        <input type="checkbox" value="None" id="slideThree" name="check" />
                                        <label for="slideThree" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="search s-sidebar__nav-link">
                                    <span className="fa fa-search" />
                                    <input placeholder="Search place" />
                                </div>
                            </li>
                            <li>
                                <a className="s-sidebar__nav-link" href="#0">
                                    <i className="fa fa-home" />
                                    <em>Home</em>
                                </a>
                            </li>
                            <li>
                                <a className="s-sidebar__nav-link" href="#0">
                                    <i className="fa fa-user" />
                                    <em>My Profile</em>
                                </a>
                            </li>
                            <li>
                                <a className="s-sidebar__nav-link" href="#0">
                                    <i className="fa fa-camera" />
                                    <em>Camera</em>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default Sidebar;
