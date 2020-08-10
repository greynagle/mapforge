import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import config from "../config";
import "./App.css";
import Landing from "../landing/landing";
import Account from "../account/account";
import Login from "../account/login";
import Maps from "../maps/map-landing";
import ApiContext from "../ApiContext";

import { growRiver, shrinkTrees } from "./helpers/slider-functions";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 9,
            height: 9,
            mapString: "b".repeat(81),
            values: { water: 50.0, tree: 50.0, city: 0.0 },
            fix: { water: false, tree: false, city: false },
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
    handleChangeString = (mapString) => {
        // setting the sliders to have the proper fractional values
        const waterPercentage = (
            (100 * mapString.split("").filter((i) => i == "w").length) /
            mapString.length
        ).toFixed(1);
        const treePercentage = (
            (100 * mapString.split("").filter((i) => i == "t").length) /
            mapString.length
        ).toFixed(1);

        this.setState((prevstate) => {
            return {
                mapString,
                values: {
                    water: waterPercentage,
                    tree: treePercentage,
                    city: prevstate.values.city,
                },
            };
        });
    };

    handleChangeWidth = (e) => {
        const width = Number(e.target.value) <= 0 ? 1 : Number(e.target.value);
        this.setState((prevstate) => ({
            width,
            mapString: "b".repeat(prevstate.height * width),
        }));
    };

    handleChangeHeight = (e) => {
        const height = Number(e.target.value) <= 0 ? 1 : Number(e.target.value);
        this.setState((prevstate) => ({
            height,
            mapString: "b".repeat(prevstate.width * height),
        }));
    };

    handleChangeSlider = (e) => {
        const name = e.target.id;
        const sliderValue = e.target.value;
        let mapString;

        if (name == "water") {
            mapString = growRiver(
                this.state.height,
                this.state.width,
                this.state.mapString.split(""),
                sliderValue
            );
        } else if (name == "tree") {
            mapString = shrinkTrees(
                this.state.mapString.split(""),
                sliderValue
            );
        } else {

		}

        if (!this.state.fix[name]) {
            this.setState((prevstate) => {
                return {
                    mapString,
                    values: { ...prevstate.values, [name]: sliderValue },
                };
            });
        }
    };

    handleChangeFix = (e) => {
        let name = e.target.id;
        let value = e.target.checked;

        console.log("name", name, "value", value);

        this.setState((prevstate) => {
            return {
                fix: { ...prevstate.fix, [name]: value },
            };
        });
    };

    render() {
        const value = {
            width: this.state.width,
            height: this.state.height,
            mapString: this.state.mapString,
            values: this.state.values,
            fix: this.state.fix,
            changeWidth: this.handleChangeWidth,
            changeHeight: this.handleChangeHeight,
            changeString: this.handleChangeString,
            changeSlider: this.handleChangeSlider,
            changeFix: this.handleChangeFix,
        };
        return (
            <ApiContext.Provider value={value}>
                <div className="jumbotron">
                    <nav className="App_nav"></nav>
                    <header className="App_header">
                        <h1>
                            <Link to="/">MapForge</Link>{" "}
                        </h1>
                        <ul className="top-link-list">
                            <li className="top-link">
                                <Link to={`/maps`}>Maps</Link>
                            </li>
                            <li className="top-link">
                                <Link to={`/login`}>Login</Link>(
                                <Link to={`/account`}>Account</Link>)
                            </li>
                        </ul>
                    </header>
                    <main className="App_main">{this.renderMainRoutes()}</main>
                </div>
            </ApiContext.Provider>
        );
    }
}

export default App;
