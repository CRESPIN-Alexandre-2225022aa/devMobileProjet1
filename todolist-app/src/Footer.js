import React from "react";
import TodoApp from "./TodoApp";

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleInputChange(event) {
        this.setState({ inputValue: event.target.value });
    }

    handleAddTask() {
        this.props.addTask();
        this.setState({ inputValue: '' });
    }

    handleSearch(event) {
        this.props.onSearch(event.target.value);
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Recherche..."
                    value={this.props.searchText}
                    onChange={this.handleSearch}
                />
                <button onClick={this.handleAddTask}>Ajouter une tâche</button>
            </div>
        );
    }
}

export default Footer