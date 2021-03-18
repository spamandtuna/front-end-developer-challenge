import './RuneTalent.sass';
import React from "react";

function RuneTalent(props) {

    const classes = ["rune-talent"]
    if (props.active) {
        classes.push("active")
    }

    return (
        <div id={"rune-talent-" + props.id}
             className={classes.join(" ")}
             onClick={props.onClick}
             onContextMenu={props.onContextMenu}
        />
    );
}

export default RuneTalent;
