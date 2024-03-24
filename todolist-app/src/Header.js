import React from "react";

class Header extends React.Component {
    render() {
        const { totalTasks, remainingTasks } = this.props;
        const progress = 100 - Math.round((remainingTasks / totalTasks) * 100);

        return (
            <div className="header">
                <h2>Progression :</h2>
                <p>Nombre de tâches restantes : {remainingTasks} / {totalTasks}</p>
                <p>Progression : {progress}%</p>
            </div>
        );
    }
}

export default Header