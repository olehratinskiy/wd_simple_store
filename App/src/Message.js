import React from "react";


function Message(props) {
    return (
        <div className="msg">
            <p className="msg-text">Error {props.code}. {props.state}.</p>
            <button className="msg-btn" type="button" onClick={(props.handleClose)}>Close</button>
        </div>
    );
}

export default Message;
