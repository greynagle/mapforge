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
                    Set your grid size and click "Random." You can then use the
                    sliders to adjust the map. Click on tiles to cycle through
                    the different types. Check the fix boxes to freeze the
                    sliders. Be sure to save the map when you're happy with it!
                </p>
                <MapGrid />
            </div>
        );
    }
}
