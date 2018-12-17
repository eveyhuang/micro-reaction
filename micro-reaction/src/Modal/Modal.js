import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react'


const Modal = ({ handleSubmit, handleClose, show, post, categ }) => {
    
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <p> {post.content} </p>
          <Dropdown placeholder='Categories' fluid multiple selection options={categ} />
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleClose}>Close</Button>
        </section>
      </div>
    );
};



export default Modal;  