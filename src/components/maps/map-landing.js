import React, { Component } from "react";


import "./maps.css";
import ApiContext from "../../ApiContext";
import MapGrid from "./map-grid";

export default class Maps extends Component {
    static defaultProps = {};
    static contextType = ApiContext;

    render() {
        return (
            <div className="sub-header">
                <h2>Generator</h2>
                <p className="info">
                    Use the sliders to adjust the map. Click
                    on tiles to cycle through the different types. Be
                    sure to save the map when you're happy with it!
                </p>
                <MapGrid />
            </div>
        );
    }
}
