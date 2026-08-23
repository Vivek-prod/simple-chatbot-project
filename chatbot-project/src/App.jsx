import { useState,useEffect,useRef } from 'react';
import { ChatInput } from './components/ChatInput';
import LoadingSpinnerGIF from './assets/loading-Spinner.gif'
import './App.css';
import ChatMessages from './components/ChatMessages';

function App() {   
    const [chatMessages,setChatMessages]=useState(()=>{
        const saved=localStorage.getItem('chatMessages');
        return saved? JSON.parse(saved):[];
    });

    const[isLoading,setIsLoading]=useState(false)

    const chatMessagesRef=useRef(null)

    useEffect(()=>{
        const containerElen=chatMessagesRef.current;
        if(containerElen){
            containerElen.scrollTop=containerElen.scrollHeight;
        }
    },[chatMessages,isLoading]);

    useEffect(()=>{
        localStorage.setItem('chatMessages',JSON.stringify(chatMessages));
    },[chatMessages]);
    
    return(
        <div className='chatbot-container'>

            <div className='chat-message-container' ref={chatMessagesRef}>

                {chatMessages.length===0 && (
                    <div className='welcome-message'>
                        <h2>Welcome To Chatbot</h2>
                        <p>How can I help you today?</p>
                    </div>
                )}
                
                <ChatMessages 
                    chatMessages={chatMessages}    
                />

                {isLoading && (
                    <div>
                        <img src={LoadingSpinnerGIF} className='chat-message-profile' /> 
                        {/* <p className='chat-message-contents'>...</p>    */}
                    </div>

                )}

            </div>

            <div className='chat-input-container'>
                <ChatInput 
                    chatMessages={chatMessages}
                    setChatMessages={setChatMessages}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}/>  
            </div>
        </div> 
    )
}

export default App
