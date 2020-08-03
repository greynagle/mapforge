import React from "react";
import { Link } from "react-router-dom";
// import "./landing.css";

export default class Landing extends React.Component {
    // The load-in page

    render() {
        return (
            <p className="landing">
                MapForge is a tabletop map generator. Set your grid size and
                allow us to generate a map for you, or design one yourself
                through the map interface.
            </p>
        );
    }
}
