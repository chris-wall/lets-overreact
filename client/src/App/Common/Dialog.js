import React from 'react';
import './Dialog.css';

export default class Dialog extends React.Component {
    constructor(props) {
        super(props);
    
        this.closeDialog = this.closeDialog.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.userCancel = this.userCancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open === true && this.props.open !== true) {
            document.getElementById(nextProps.id).showModal();
        }
    }
    
    closeDialog(e = { canceled: false }) {
        document.getElementById(this.props.id).close();
        if (typeof this.props.onClose === 'function') {
            this.props.onClose(e);
        }
    }
    
    submitForm(event) {
        event.preventDefault();
        this.closeDialog({ canceled: false });
    }

    userCancel() {
        this.closeDialog({ canceled: true });
    }
    
    render() {
        return (
            <dialog id={this.props.id} className={this.props.className}>
                <div className="dialog-container">
                    <form onSubmit={this.submitForm}>
                        <header className="flex-spaced">
                            <h4>{this.props.title}</h4>
                            <button type="button" className="dialog__close-button" onClick={this.userCancel}>&times;</button>
                        </header>
                        <main>
                            { this.props.children }
                        </main>
                        <footer>
                            <button type="button" className="dialog__button dialog__button--cancel" onClick={this.userCancel}>
                                <i className="material-icons">clear</i>
                                <span>Cancel</span>
                            </button>
                            <button type="submit" className="dialog__button dialog__button--ok">
                                <i className="material-icons">check</i>
                                <span>Accept</span>
                            </button>
                        </footer>
                    </form>
                </div>
            </dialog>
        );
    }
}
