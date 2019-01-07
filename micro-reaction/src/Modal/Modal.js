import React from 'react';

import { Button, Dropdown, Container, Header, Message } from 'semantic-ui-react'

let selectedCategory=[]



const Modal = ({ handleSubmit, handleClose, handleContinue, show, post, categ }) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const setCategories = (event, {value})=>{
      console.log(value);
      selectedCategory=value;
    }

    const submitCateg=()=>{
      handleSubmit(post.id, selectedCategory)
      handleClose()
     
      selectedCategory=[];
    }

    const continueTask=()=>{
      handleContinue()
      handleSubmit(post.id, selectedCategory)
      selectedCategory=[];
    }

    

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
        <Container text>
        <Header size='medium'>Would you help to categorize this post?</Header>
          <Message  >
            <Message.Header> {post.title} </Message.Header>
            <p> {post.user}</p>
            <p> {post.content} </p>
          </Message>
          
          
          <Dropdown placeholder='Categories' fluid multiple selection closeOnChange options={categ} onChange = {setCategories} />
          <Button onClick={submitCateg}>Submit and Exit</Button>
          <Button onClick={continueTask}>Submit and Continue</Button>
          <Button onClick={handleClose}>Close</Button>
        </Container>
         
        </section>
      </div>
    );
};



export default Modal;  