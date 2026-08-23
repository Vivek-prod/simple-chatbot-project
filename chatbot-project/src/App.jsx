import { useState,useEffect,useRef } from 'react';
import './App.css';
import {Chatbot} from 'supersimpledev';

import RobotProfileImage from './assets/robot.png'
import UserProfileImage from './assets/user.png'
import LoadingSpinnerGIF from './assets/loading-Spinner.gif'


function ChatInput({chatMessages,setChatMessages,isLoading,setIsLoading}) {
    const[inputText,setInputText]=useState('')

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    function handleKeyDown(event) {
        if (event.key==='Enter'){
            sendMessage()
        }else if (event.key==='Escape'){
            setInputText('')
        }
    }


    function sendMessage() {
        if(inputText.trim()===''){
            return
        }

        const newChatMessages=[
            ...chatMessages,
            {
            message:inputText,
            sender: 'user',
            id: crypto.randomUUID()
            },
        ]

        setChatMessages(newChatMessages);
        setInputText('');
        setIsLoading(true)

        setTimeout(() => {
            const response=Chatbot.getResponse(inputText);
            setChatMessages([
                ...newChatMessages,
                {
                message:response,
                sender: 'robot',
                id: crypto.randomUUID()  
                }
            ]);
            setIsLoading(false) 
        }, 1000);
        
    }

    return (
        <>
            <input 
                placeholder="Send a message to Chatbot" 
                
                value={inputText}
                onChange={saveInputText}
                onKeyDown={handleKeyDown}
                className='chat-input'

            />
            <button 

                onClick={sendMessage}
                className='send-button'
                disabled={isLoading}
            >Send</button>
        </>
    );
}

function ChatMessage({message,sender}) {
    return(
        
        <div className={`chat-message-container-${sender}`}>
            {sender==='robot' && (
                <img src={RobotProfileImage} className='chat-message-profile' />
            )}
            <p className='chat-message-contents'>{message}</p> 
            {sender==='user' && (
                <img src={UserProfileImage} className='chat-message-profile'/>
            )}
        </div>
    );
};


function ChatMessages({chatMessages}) {
    return(
        <>
            {chatMessages.map((chatMessage)=>{

                return (
                    <ChatMessage 
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        key={chatMessage.id}
                    />
                )
            })}
        </>
    );
}


function App() {   
    const [chatMessages,setChatMessages]=useState([])
    const[isLoading,setIsLoading]=useState(false)

    const chatMessagesRef=useRef(null)

    useEffect(()=>{
        const containerElen=chatMessagesRef.current;
        if(containerElen){
            containerElen.scrollTop=containerElen.scrollHeight;
        }
    },[chatMessages,isLoading]);
    
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
