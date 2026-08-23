import { ChatMessage } from './ChatMessage';

function ChatMessages({chatMessages}) {
    return(
        <>
            {chatMessages.map((chatMessage)=>{

                return (
                    <ChatMessage 
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        key={chatMessage.id}
                        time={chatMessage.time}
                    />
                )
            })}
        </>
    );
}

export default ChatMessages;