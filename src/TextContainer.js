import React from "react";
import SpeedIcon from "./speed.svg";
import PrecisionIcon from "./precision.svg";
import RefreshIcon from "./refresh.svg";
import { getStateClass } from "./functions";

const Item = React.memo(({ char, state }) => {
    return <span className={state}>{char}</span>
}, (prev, next) => prev.state == next.state && prev.char == next.char);

const TextContainer = ({ text, pos, refresText, missed, precision, speed }) => {
    if (!text) return <div className="container" />
    return <div className="container">
        <div>
            {text.split("").map((item, index) => <Item
                key={index.toString()}
                char={item}
                state={getStateClass(index, pos, missed)}
            />)}
        </div>
        <div>
            <div className="panel-item">
                <div>
                    <img src={SpeedIcon} />
                    <span>СКОРОСТЬ</span>
                </div>
                <span>{speed}</span>
            </div>
            <div className="panel-item">
                <div>
                    <img src={PrecisionIcon} />
                    <span>ТОЧНОСТЬ</span>
                </div>
                <span>{precision}</span>
            </div>
            <div className="panel-item" onClick={refresText}>
                <div>
                    <img src={RefreshIcon} />
                    <span>ЗАНОВО</span>
                </div>
            </div>
        </div>
    </div>
}

export default TextContainer;