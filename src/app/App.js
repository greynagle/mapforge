import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import config from "../config";
import "./App.css";
import Landing from "../landing/landing";
import Account from "../account/account";
import Login from "../account/login";

import Maps from "../maps/map-landing";
import ApiContext from "../ApiContext";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: [],
        };
    }

    componentDidMount() {
        // grab data here as necessary
    }

    // The main branches of the app
    renderMainRoutes() {
        return (
            <>
                <Route exact path="/" component={Landing} />
                <Route path="/maps" component={Maps} />
				<Route path="/login" component={Login} />
				<Route path="/account" component={Account} />
            </>
        );
    }

    // the handles, to be passed to the context
    handleAddTemp = (temps) => {
        this.setState({
            temp: [...this.state.temp, temps],
        });
    };

    render() {
        const value = {
            temp: this.state.temp,
            addTemp: this.handleAddTemp,
        };
        return (
            <ApiContext.Provider value={value}>
                <div className="jumbotron">
                    <nav className="App_nav"></nav>
                    <header className="App_header">
                        <h1>
                            <Link to="/">MapForge</Link>{" "}
                        </h1>
                    </header>
					<ul className="top-link-list">
                        <li className="top-link">
                            <Link to={`/maps`}>Maps</Link>
                        </li>
                        <li className="top-link">
                            <Link to={`/login`}>Login</Link>
							(<Link to={`/account`}>Account</Link>)
                        </li>
                    </ul>
                    <main className="App_main">{this.renderMainRoutes()}</main>
                </div>
            </ApiContext.Provider>
        );
    }
}

export default App;
