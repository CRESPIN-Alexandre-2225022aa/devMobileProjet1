import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import './App.css';

class TodoApp extends React.Component {
    openModal = () => this.setState({open: true});
    closeModal = () => this.setState({open: false});
    constructor(props) {
        super(props);
        this.state = {
            items: [
                { id: 1, text: 'Learn JavaScript', isChecked: false },
                { id: 2, text: 'Learn React', isChecked: false },
                { id: 3, text: 'Play around in JSFiddle', isChecked: true },
                { id: 4, text: 'Build something awesome', isChecked: true },
            ],
            inputTask: "Une tâche",
            searchText: "",
            open: false
        };
        this.addTask = this.addTask.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    componentDidMount() {
        const storedItems = localStorage.getItem("todoItems");
        if (storedItems) {
          this.setState({ items: JSON.parse(storedItems) });
        }
    }
    
    componentDidUpdate() {
        localStorage.setItem("todoItems", JSON.stringify(this.state.items));
    }

    render() {
        const filteredItems = this.state.items.filter((item) =>
            item.text.toLowerCase().includes(this.state.searchText.toLowerCase())
        );

        return (
            <div className="container">
                <Header
                    totalTasks={this.state.items.length}
                    remainingTasks={this.state.items.filter((item) => !item.isChecked).length}
                />

                <h2>Tasks:</h2>
                <div className="taskList">
                    <ol>
                        {filteredItems.map((item, index) => (
                            <li key={index}>
                                <div className="btnDiv">
                                        <button className="orderBtn" onClick={() => this.moveItemUp(index)}>⬆</button>
                                        <button className="orderBtn" onClick={() => this.moveItemDown(index)}>⬇</button>
                                        <button className="delete" onClick={() => this.delTask(index)}>❌</button>
                                </div>

                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    onClick={() => this.changeCheck(index)}
                                    checked={item.isChecked}
                                />
                                <span className={item.isChecked ? 'isChecked' : ''}>{item.text}</span>
                            </li>
                        ))}
                    </ol>
                </div>

                <Footer
                    addTask={this.addTask}
                    handleInputChange={this.handleInputChange}
                    open={this.state.open}
                    openModal={this.openModal}
                    closeModal={this.closeModal}
                    handleSearch={this.handleSearch}
                    searchText={this.state.searchText}
                />
            </div>
        );
    }

    handleInputChange(event) {
        this.setState({inputTask: event.target.value});
    }

    changeCheck(id) {
        const updatedItems = [...this.state.items];
        updatedItems[id].isChecked = !updatedItems[id].isChecked;
        this.setState({ items: updatedItems });
    }

    delTask(index) {
        if (window.confirm('Etes-vous sûr de vouloir supprimer cette tâche ?')) {
            const updatedItems = [...this.state.items];
            updatedItems.splice(index, 1);
            this.setState({ items: updatedItems });
        }
    }

    addTask() {
        this.setState(previousState => ({
            items : [...previousState.items,{text : this.state.inputTask, isChecked:false}]
          }));
    }

    handleSearch(event) {
        this.setState({ searchText: event.target.value });
    }

    moveItemUp = (index) => {
        if (index > 0) {
          this.setState(prevState => {
            const newItems = [...prevState.items];
            const temp = newItems[index];
            newItems[index] = newItems[index - 1];
            newItems[index - 1] = temp;
            return { items: newItems };
          });
        }
      }
    
      moveItemDown = (index) => {
        if (index < this.state.items.length - 1) {
          this.setState(prevState => {
            const newItems = [...prevState.items];
            const temp = newItems[index];
            newItems[index] = newItems[index + 1];
            newItems[index + 1] = temp;
            return { items: newItems };
          });
        }
      }
}

function App() {
    return (
        <div className="App">
          <TodoApp />
        </div>
    );
}

export default App;