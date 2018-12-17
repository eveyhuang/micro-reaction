import React from 'react';


const Modal = ({ handleClose, show, post }) => {
    
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <p> {post.content} </p>
          <button onClick={handleClose}>close</button>
        </section>
      </div>
    );
};



export default Modal;  