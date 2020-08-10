import React from "react";

export default React.createContext({
    width: 0,
    height: 0,
    mapString: "",
	values:{},
	fix: {},
    changeWidth: () => {},
    changeHeight: () => {},
    changeString: () => {},
	changeSlider: () => {},
	changeFix: () => {},
});
