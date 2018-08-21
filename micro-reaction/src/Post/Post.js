import React from 'react';
import { Button, Comment, Form, Header, Icon } from 'semantic-ui-react'
import './Post.css';



const Post = (props) => {
    return (
        <div className="module">
            <div className="main-post">
                <div className='container'>
                <div className='up'>
                    <div className='info'>
                        <a href="#" className='avatar'>
                        <img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' title=''/></a>
                        
                        <a class='user'>Ordinary Joe</a>
                        
                        <span class='ca'> 
                        <a className = 'time' href='#' title="21 October at 18:03">21 August at 18:03</a> 
                        </span>        
                    </div>
                    <p> Infuse your life with action. Dont wait for it to happen. Make it happen. Make your own future. Make your own hope. Make your own love. And whatever your beliefs, honor your creator, not by passively waiting for grace to come down from upon high, but by doing what you can to make grace happen yourself, right now, right down here on Earth.
                    </p>
            
                    <div className='react'>
                            <span className="like-main"> 
                            <span className='like' onHover={() => console.log("hover")} >Like</span>
                            </span>
                            <span href='#' className='comment' title="Leave a comment">Comment</span>
                        
                    </div>
                    <ul className='emoji'>
                        <li  className="reaction reaction-like" data-reaction="Like"></li>
                        <li  className="reaction reaction-love" data-reaction="Love"></li>
                        <li  className="reaction reaction-haha" data-reaction="HaHa"></li>
                        <li className="reaction reaction-wow" data-reaction="Wow"></li>
                        <li className="reaction reaction-sad" data-reaction="Sad"></li>
                        <li className="reaction reaction-angry" data-reaction="Angry"></li>
                    </ul>
                </div>
                
                </div>

         </div>
     </div>
    );
};




export default Post;