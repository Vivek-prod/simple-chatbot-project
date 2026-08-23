import { useState} from 'react';
import {Chatbot} from 'supersimpledev';

export function ChatInput({chatMessages,setChatMessages,isLoading,setIsLoading}) {
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

