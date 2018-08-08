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
                                        <input
                                            type="checkbox"
                                            value="None"
                                            id="slideThree"
                                            name="check"
                                            onChange={event => this.props.onTogglePOI(event.target.checked)}
                                            aria-label={'Point of Interest'}
                                            aria-checked="false"
                                        />
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
                                        aria-label={'Filter from cafes list'}
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
                                                onMouseOver={event => this.props.onMouseOver(i)}
                                                onMouseOut={event => this.props.onMouseOut(i)}
                                                onClick={event => this.props.onClick(i)}
                                                aria-label={cafe.name}
                                            >
                                                <i className="fa fa-coffee" />
                                                <em>{cafe.name}</em>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className={`li-cafes-list network-status ${this.props.fsCon}`}>
                                <div>
                                    <p className="network-status-msg">
                                        {this.props.fsCon === 'green' ? (
                                            <b>
                                                Powered by{' '}
                                                <a href="https://foursquare.com/" target="_blank">
                                                    Foursquare
                                                </a>
                                            </b>
                                        ) : (
                                            <b>
                                                Connection error to{' '}
                                                <a href="https://foursquare.com/" target="_blank">
                                                    Foursquare
                                                </a>
                                            </b>
                                        )}
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default Sidebar;
