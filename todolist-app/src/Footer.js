import React from "react";
import './App.css';
import {Box, Button, Modal, Typography} from "@mui/material";

class Footer extends React.Component {
    popUpStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#706f6f',
        border: '2px solid #000',
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    };

    render() {
        return (
            <div className="searchBarDiv">
                <input
                    className="searchBar"
                    placeholder="Recherche..."
                    value={this.props.searchText}
                    onChange={this.props.handleSearch}
                />
                <br/>
                <button className="btnOpenModal" onClick={this.props.openModal}>Ajouter une tâche</button>
                <Modal
                    open={this.props.open}
                    onClose={this.props.closeModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <Box sx={this.popUpStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        </Typography>
                        <input className="inputAddTask" onChange={this.props.handleInputChange}></input>
                        <button className="buttonModal" onClick={() => this.handleAddTask()}>Ajouter</button>
                        <button className="buttonModal" onClick={this.props.closeModal}>Annuler</button>
                    </Box>
                </Modal>
            </div>
        );
    }

    handleAddTask() {
        this.props.addTask();
        this.props.closeModal();
    }
}

export default Footer