import React, { Component } from "react";
import {
    Route,
    Link,
    Switch,
    useParams,
    useRouteMatch,
} from "react-router-dom";
// import PartForm from "./pdm-prt-form.js";
// import AsmForm from "./pdm-asm-form";
// import PrtTable from "./PrtTable";
// import AsmTable from "./AsmTable";
import "./maps.css";
import ApiContext from "../ApiContext";
import MapGrid from "./map-grid";
// import AsmContents from "./AsmContents";

export default class Maps extends Component {
    static defaultProps = {};
    static contextType = ApiContext;

    render() {
        // a function to render the various routing options for the data management path

        function Links() {
            let { path, url } = useRouteMatch();

            return (
                <>
                    <h2>Generator</h2>
                    <p className="info">
                        Use the proportional sliders to set a random map seed.
                        Click on tiles to cycle through the different terrain
                        types. Be sure to export the map when you're happy with
                        it!
                    </p>
                </>
            );
        }

        // function Forms() {
        //     let { formType } = useParams();

        //     switch (formType) {
        //         case "prt-form":
        //             return <PartForm />;
        //         case "asm-form":
        //             return <AsmForm />;
        //         default:
        //             return <AsmContents id={formType} />;
        //     }
        // }

        return (
            <div className="sub-header">
                <Links />
                <MapGrid />
            </div>
        );
    }
}
