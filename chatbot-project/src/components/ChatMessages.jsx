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
                    />
                )
            })}
        </>
    );
}

export default ChatMessages;