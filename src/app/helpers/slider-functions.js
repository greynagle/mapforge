export function growRiver(height, width, mapArr, slider) {
    let modifiedMap = mapArr.map((val) => val);

    for (let j = 0; j < width; j++) {
        for (let i = j; i < height * width; i += width) {
            if (mapArr[i] == "w") {
                if (mapArr[i - width] != "w") {
                    if (i - width >= 0) {
                        modifiedMap[i - width] = "w";
                    }
                }
                if (mapArr[i + width] != "w") {
                    if (i + width <= height * width - 1) {
                        modifiedMap[i + width] = "w";
                    }
                }
            }
        }
    }

    const newPercent = (
        (100 * modifiedMap.filter((i) => i == "w").length) /
        modifiedMap.length
    ).toFixed(1);

    if (newPercent < slider) {
        return modifiedMap.join("");
    } else {
        return mapArr.join("");
    }
}

function treeRand(mapArr) {
    let index = Math.round(Math.random() * mapArr.length);
    if (mapArr.includes("t")) {
        if (mapArr[index] == "t") {
            return index;
        } else {
            return treeRand(mapArr);
        }
    }
}

export function shrinkTrees(mapArr, slider) {
    let modifiedMap = mapArr.map((val) => val);

    let index = treeRand(mapArr);

    modifiedMap[index] = "b";

    // const newPercent = (
    //     (100 * modifiedMap.filter((i) => i == "t").length) /
    //     modifiedMap.length
    // ).toFixed(1);

    // if (newPercent < slider) {
    return modifiedMap.join("");
    // } else {
    // return mapArr.join("");
    // }
}
