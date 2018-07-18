import React, { Component } from 'react';

class Sidebar extends Component {
    onMouseOver = i => {
        this.props.markers[i].setAnimation(window.google.maps.Animation.BOUNCE);
    };

    onMouseOut = i => {
        this.props.markers[i].setAnimation(null);
    };

    onClick = i => {};

    render() {
        return (
            <div className="s-layout">
                <div className="s-layout__sidebar">
                    <a className="s-sidebar__trigger" href="#0">
                        <i className="fa fa-bars" />
                    </a>
                    <nav className="s-sidebar__nav">
                        <header>
                            <h1>
                                Café<span>MAP</span>
                            </h1>
                            <span>COVENTRY</span>
                        </header>
                        <ul className="filter-option">
                            <li className="filter-option-item">
                                <div className="s-sidebar__nav-link">
                                    <i className="fa fa-flag" />
                                    <em>POI</em>
                                    <div className="slideThree">
                                        <input type="checkbox" value="None" id="slideThree" name="check" />
                                        <label htmlFor="slideThree" />
                                    </div>
                                </div>
                            </li>
                            <li className="filter-option-item">
                                <div className="search s-sidebar__nav-link">
                                    <span className="fa fa-search" />
                                    <input
                                        placeholder="Filter cafe"
                                        value={this.props.query}
                                        onChange={event => this.props.onQuery(event.target.value)}
                                    />
                                </div>
                            </li>

                            <li className="li-cafes-list">
                                <ul className="ul-cafes-list">
                                    {this.props.cafes.map((cafe, i) => (
                                        <li key={cafe.id} className="cafe-list-item">
                                            <a
                                                className="s-sidebar__nav-link"
                                                href={`#${i}`}
                                                onMouseOver={event => this.onMouseOver(i)}
                                                onMouseOut={event => this.onMouseOut(i)}
                                                onClick={event => this.onClick(i)}
                                            >
                                                <i className="fa fa-coffee" />
                                                <em>{cafe.name}</em>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default Sidebar;
