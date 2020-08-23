import React from "react";
import ApiContext from "../../../ApiContext";

class PercentSliders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static contextType = ApiContext;

    render() {
        const values = Object.entries(this.context.values);

        const keys = values.map((val) => val[0]);

        return keys.map((item, ind) => (
            <div key={`${ind}div`} className="sliderSet">
                <span className="sliderBox">
                    <label key={`${ind}Sli`} htmlFor={`${item}Input`}>
                        {item}
                    </label>
                    <input
                        type="range"
                        className={`slider ${item}-slider`}
                        key={item}
                        step={`${1/(this.context.height*this.context.width)}`}
                        name={item}
                        id={item}
                        min={0}
                        value={this.context.values[item]}
                        max={1}
                        onChange={(e) => this.context.changeSlider(e)}
                    />
                </span>
                <span className="fix">
                    <label key={`${ind}Chk`} htmlFor={`${item}Fix`}>
                        Fix:
                    </label>
                    <input
                        type="checkbox"
                        name={item}
                        id={item}
                        key={`${ind}${item}`}
                        value={item}
                        onClick={(e) => this.context.changeFix(e)}
                    />
                </span>
            </div>
        ));
    }
}

export default PercentSliders;
