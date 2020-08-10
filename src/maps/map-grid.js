import React, { Component } from "react";
import ApiContext from "../ApiContext";

import PercentSliders from "./inputs/slider.js";
import Grid from "./grid";
import { generateRiver, generateTreeFill } from "./helpers/random-functions";

export default class MapGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static contextType = ApiContext;

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    // resetting the inputs and grid size
    reset = () => {
        let e = { target: { value: 9 } };
        this.context.changeHeight(e);
        this.context.changeWidth(e);

        // updating the state doesn't seem to force an
        // update of the values once default is changed.
        // Resetting inputs separately
        document.getElementById("width").value = 9;
        document.getElementById("height").value = 9;
    };

    // randomizes the grid
    randomize = () => {
        // generating the river
        const path = generateRiver(this.context.height, this.context.width);

        let mapStringArr = "b"
            .repeat(this.context.height * this.context.width)
            .split("");

        // adding the river tiles
        path.forEach((i) => {
            mapStringArr[i] = "w";
        });

        // fills in the tiles currently unfilled by water, with some spacing
        mapStringArr = generateTreeFill(this.context.width, mapStringArr, path);

        this.context.changeString(mapStringArr.join(""));
    };

    render() {
        return (
            <form className="grid" onSubmit={this.handleSubmit}>
                <label htmlFor="width">Width: </label>
                <input
                    className="new-inputs"
                    type="number"
                    name="width"
                    id="width"
                    min="1"
                    step="1"
                    defaultValue={this.context.width}
                    onChange={(e) => this.context.changeWidth(e)}
                    autoComplete="off"
                    required
                />
                <label htmlFor="height">Height: </label>
                <input
                    className="new-inputs"
                    type="number"
                    name="height"
                    id="height"
                    min="1"
                    step="1"
                    defaultValue={this.context.height}
                    onChange={(e) => this.context.changeHeight(e)}
                    autoComplete="off"
                    required
                />
                <br />
                <PercentSliders />
                <Grid
                    mapString={this.context.mapString}
                    width={this.context.width}
                    height={this.context.height}
                />

                <div>
                    <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => this.randomize()}
                    >
                        Random
                    </button>
                    <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => this.reset()}
                    >
                        Reset
                    </button>
                    <button className="btn btn-secondary" type="button">
                        Save
                    </button>
                </div>
            </form>
        );
    }
}
