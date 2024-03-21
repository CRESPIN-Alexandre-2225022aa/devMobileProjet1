import React from "react";
import Header from "./Header.js"
import Footer from "./Footer.js"

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                { id: 1, text: 'Learn JavaScript', done: false },
                { id: 2, text: 'Learn React', done: false },
                { id: 3, text: 'Play around in JSFiddle', done: true },
                { id: 4, text: 'Build something awesome', done: true },
            ],
            searchText: '',
        };
        this.changeCheck = this.changeCheck.bind(this);
        this.delTask = this.delTask.bind(this);
        this.addTask = this.addTask.bind(this);
        this.getTotalTasks = this.getTotalTasks.bind(this);
        this.getRemainingTasks = this.getRemainingTasks.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.changeOrder = this.changeOrder.bind(this);
    }

    getTotalTasks() {
        return this.state.items.length;
    }

    getRemainingTasks() {
        return this.state.items.filter((item) => !item.done).length;
    }

    handleSearch(searchText) {
        this.setState({ searchText });
    }

    render() {
        const filteredItems = this.state.items.filter((item) =>
            item.text.toLowerCase().includes(this.state.searchText.toLowerCase())
        );

        return (
            <div>
                <Header //doit etre dans un fichier different
                    totalTasks={this.getTotalTasks()}
                    remainingTasks={this.getRemainingTasks()}
                />
                <h2>Todos:</h2>
                <ol>
                    {filteredItems.map((item, index) => (
                        <li key={item.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    onClick={() => this.changeCheck(item.id)}
                                    checked={item.done}
                                />
                                <span className={item.done ? 'done' : ''}>{item.text}</span>
                                <button onClick={() => this.delTask(item.id)}>-</button>
                                {index > 0 && (
                                    <button onClick={() => this.changeOrder(index, index - 1)}>
                                        ⬆️
                                    </button>
                                )}
                                {index < filteredItems.length - 1 && (
                                    <button onClick={() => this.changeOrder(index, index + 1)}>
                                        ⬇️
                                    </button>
                                )}
                            </label>
                        </li>
                    ))}
                </ol>
                <Footer //doit etre dans un fichier different
                    addTask={this.addTask}
                    onSearch={this.handleSearch}
                    searchText={this.state.searchText}
                />
            </div>
        );
    }

    delTask(id) {
        if (window.confirm('Etes-vous sûr de vouloir supprimer cette tâche ?')) {
            this.setState((prevState) => ({
                items: prevState.items.filter((item) => item.id !== id),
            }));
        }
    }

    addTask() {
        const taskTitle = prompt("Entrez le titre de la nouvelle tâche :");
        if (taskTitle) {
            const newItem = {
                id: Date.now(),
                text: taskTitle,
                done: false
            };
            this.setState(prevState => ({
                items: [...prevState.items, newItem]
            }));
        }
    }

    changeCheck(id) {
        this.setState((prevState) => ({
            items: prevState.items.map((item) =>
                item.id === id ? { ...item, done: !item.done } : item
            ),
        }));
    }

    changeOrder(currentIndex, newIndex) {
        this.setState((prevState) => {
            const items = [...prevState.items];
            const movedItem = items.splice(currentIndex, 1)[0];
            items.splice(newIndex, 0, movedItem);
            return { items };
        });
    }
}

export default TodoApp