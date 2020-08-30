import React, { Component } from "react";
import ApiContext from "../../ApiContext";
import config from "../../config";
import TokenService from "../../services/token-service";

import PercentSliders from "./inputs/slider.js";
import Grid from "./grid";
import { generateRiver, generateTreeFill } from "./helpers/random-functions";

export default class MapGrid extends Component {
    constructor(props) {
        super(props);
    }
    static contextType = ApiContext;

    state = { error: null, saved: null };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    // resetting the inputs and grid size
    reset = () => {
        let e = { target: { value: 9 } };
        this.context.changeName({ target: { value: "" } });
        this.context.changeHeight(e);
        this.context.changeWidth(e);

        // updating the state doesn't seem to force an
        // update of the values once default is changed.
        // Resetting inputs separately
        document.getElementById("width").value = 9;
        document.getElementById("height").value = 9;
        document.getElementById("name").value = "";
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

        mapStringArr[Math.floor(Math.random() * mapStringArr.length)] = "c";

        this.context.changeString(mapStringArr.join(""));
    };

    save = () => {
        const token = TokenService.getAuthToken();
        if (token) {
            if (this.context.name != "") {
                return fetch(`${config.API_ENDPOINT}/maps`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        map_name: this.context.name,
                        map_string: this.context.mapString,
                        width: this.context.width,
                    }),
                }).then((res) =>
                    !res.ok
                        ? res.json().then((e) => Promise.reject(e))
                        : res.json()
                ).then(
                this.setState({ error: null, saved: "Saved successfully!"})
				);
            } else {
                this.setState({ saved: null, error: "Map must be named to be saved" });
            }
        } else {
            this.setState({ saved: null, error: "User must be logged in to save a map" });
        }
    };

    render() {
        const { error, saved } = this.state;
        return (
            <form className="grid" onSubmit={this.handleSubmit}>
                <div role="alert">
                    {error && <p className="red">{error}</p>}
                </div>
                <div role="alert">{saved && <p>{saved}</p>}</div>
                <label htmlFor="name">Name: </label>
                <input
                    className="new-inputs"
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={this.context.name}
                    onChange={(e) => this.context.changeName(e)}
                    autoComplete="off"
                    required
                />
                <br />
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
                        className="btn btn-secondary random"
                        type="button"
                        onClick={() => this.randomize()}
                    >
                        Random
                    </button>
                    <button
                        className="btn btn-secondary reset"
                        type="button"
                        onClick={() => this.reset()}
                    >
                        Reset
                    </button>
                    <button
                        className="btn btn-secondary save"
                        type="button"
                        onClick={() => this.save()}
                    >
                        Save
                    </button>
                </div>
            </form>
        );
    }
}
