import './RuneLoadout.sass';
import React from "react";
import RuneTalent from './RuneTalent/RuneTalent';
import TalentPath from "./TalentPath/TalentPath";

const active = true
const inactive = false
const maxPoints = 6

class RuneLoadout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            talents: Array(8).fill(false)
        };
    }

    addTalent(i) {
        if (this.countActiveTalents() < 6) {
            this.setTalent(i, active)
        }
    }

    removeTalent(evt, i) {
        this.setTalent(i, inactive)
        evt.preventDefault();
    }

    setTalent(i, isActive) {
        const talents = this.state.talents.slice();
        if (talents[i] === isActive) {
            return;
        }

        const positionInPath = i % 4;
        const canSet = isActive
                       ? positionInPath === 0 || talents[i - 1] === active
                       : positionInPath === 3 || talents[i + 1] === inactive;
        if (canSet) {
            talents[i] = isActive;
            this.setState({talents: talents});
        }
    }

    countActiveTalents() {
        return this.state.talents.filter(Boolean).length;
    }

    renderTalent(i) {
        return (
            <RuneTalent
                id={i}
                active={this.state.talents[i]}
                onClick={() => this.addTalent(i)}
                onContextMenu={(evt) => this.removeTalent(evt, i)}
            />
        );
    }

    renderTalentPath(name, start, end) {
        const talents = []
        const talentSpacer = <div className="talent-spacer"/>

        for (let i = start; i < end; i++) {
            talents.push(
                this.renderTalent(i),
                talentSpacer
            )
        }
        talents.push(this.renderTalent(end))

        return <TalentPath
            name={name}
            talents={talents}
        />;
    }

    render() {
        return (
            <div className="rune-loadout">
                <header>
                    <h1>
                        TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000
                    </h1>
                </header>

                <div className="rune-loadout-calculator flex-container">
                    <div className="talent-paths">
                        {this.renderTalentPath("TALENT PATH 1", 0, 3)}
                        {this.renderTalentPath("TALENT PATH 2", 4, 7)}
                    </div>

                    <div className="talent-points">
                        <h2>
                            <div>{this.countActiveTalents()} / {maxPoints}</div>
                            <div className="text-secondary">Points Spent</div>
                        </h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default RuneLoadout;
