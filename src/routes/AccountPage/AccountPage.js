import React, { Component } from "react";
import { Section } from "../../components/Utils/Utils";
import { Link } from "react-router-dom";
import AccountService from "../../services/account-service";

import ApiContext from "../../ApiContext";

export default class AccountPage extends Component {
    static defaultProps = {
        history: {
            push: () => {},
        },
    };
    static contextType = ApiContext;

    state = { error: null, nickname: "", maps: [] };

    componentDidMount() {
        this.setState({ error: null });

        AccountService.getMaps()
            .then((res) => {
                const { nickname, maps } = res;
                this.setState({
                    nickname,
                    maps,
                });
                return res.json();
            })
            .catch((res) => {
                this.setState({ error: res.error });
            });
    }

    handleClick(e) {
		const mapLink = this.state.maps.find(val => val.map_name === e.target.text)
		this.context.clickAccountLink(mapLink)
	};

    render() {
        return (
            <Section className="AccountPage sub-header">
                <h2>Welcome back, {this.state.nickname}!</h2>
                <h3>Saved</h3>
                <ul>
                    {this.state.maps.map((val) => {
                        return (
                            <li className="account-link" key={`li ${val.map_name}`}>
                                <Link
                                    key={`${val.map_name}`}
                                    to={`/maps/${val.map_name}`}
                                    onClick={(e) => this.handleClick(e)}
                                >
                                    {val.map_name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </Section>
        );
    }
}
