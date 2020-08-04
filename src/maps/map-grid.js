import React, { Component } from "react";
import ApiContext from "../ApiContext";

export default class MapGrid extends Component {
    static defaultProps = {};
    static contextType = ApiContext;

    // a function to generate the table displayed in the "machines" tab
    render() {
        function grid() {
            let n = 16,
                s = [];

            for (let i = 0; i < n; i++) {
                s += '<div class="row">';
                for (let j = 0; j < n; j++) s += `<div class="cell"> </div>`;
                s += "</div>";
            }
            return s.toString();
        }

        return (
            <form className="grid" onSubmit={this.handleSubmit}>
                <div className="slidecontainer">
                    <label htmlFor="Water">Water</label>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        defaultValue="0"
                        className="slider"
                        id="water"
                    />
                </div>
                <div className="slidecontainer">
                    <label htmlFor="trees">Trees</label>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        defaultValue="0"
                        className="slider tree-slider"
                        id="trees"
                    />
                </div>
                <div className="slidecontainer">
                    <label htmlFor="town">Town</label>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        defaultValue="0"
                        className="slider city-slider"
                        id="town"
                    />
                </div>
                <div
                    id="container"
                    dangerouslySetInnerHTML={{ __html: grid() }}
                ></div>
                <div>
                    <button className="btn btn-secondary" type="submit">
                        Random
                    </button>
					<button className="btn btn-secondary" type="reset">
                        Reset
                    </button>
					<button className="btn btn-secondary" type="button">
                        Export
                    </button>
                </div>
            </form>
        );
    }
}
