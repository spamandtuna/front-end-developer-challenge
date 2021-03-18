import './TalentPath.sass';
import React from "react";

function TalentPath(props) {
    return (
        <div className="talent-path flex-container">
            <div className="talent-path-name">
                <p>{props.name}</p>
            </div>
            <div className="talents">
                {props.talents}
            </div>
        </div>
    );
}

export default TalentPath;
