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
// import "./pdm.css";
import ApiContext from "../ApiContext";
// import AsmContents from "./AsmContents";

export default class Account extends Component {
    static defaultProps = {
        history: {
            goBack: () => {},
        },
        match: {
            params: {},
        },
    };
    static contextType = ApiContext;
    state = {
        username: "",
        password: "",
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // verify, post new part, return new part info
        // if (/[^a-zA-Z\d\s,]/.test(this.state.description)) {
        //     alert(
        //         "The description must contain only alphanumeric characters, spaces, and commas"
        //     );
        // } else if (/[^a-zA-Z\d\s,]/.test(this.state.stock)) {
        //     alert(
        //         "The stock must contain only alphanumeric characters, spaces, and commas"
        //     );
        // } else {
        //     fetch(`${config.API_ENDPOINT}/parts/`, {
        //         mode: "cors",
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             description: this.state.description,
        //             stock: this.state.stock,
        //             machine: this.state.machine,
        //             complexity: this.state.complexity,
        //         }),
        //     })
        //         .then((res) => {
        //             if (!res.ok) {
        //                 return res.json().then((e) => Promise.reject(e));
        //             }
        //             return res.json();
        //         })
        //         .then((resJSON) => {
        //             const { description, id, stock } = resJSON;
        //             this.context.addPart({ description, id, stock });
        //         })
        // 		.then(() => {
        //             this.popup();
        //         })
        //         .catch((error) => {
        //             console.error({ error });
        //         });
        // }
    };

    render() {
        // a function to render the various routing options for the data management path

        return (
            <div className="sub-header">
                <h2>Welcome back</h2>
                <p>
                    Saved maps:
                    <br />
                    <Link to={`maps/forest`}>Forest</Link>
                    <br />
                    <Link to={`maps/river`}>Riverbank</Link>
                    <br />
                    <Link to={`maps/hamlet`}>Hamlet</Link>
                    <br />
                    <Link to={`maps/city`}>City</Link>
                    <br />
                </p>
            </div>
        );
    }
}
