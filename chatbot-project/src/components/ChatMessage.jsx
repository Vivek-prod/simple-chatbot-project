import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'
import './ChatMessage.css'


export function ChatMessage({message,sender,time}) {
    return(
        
        <div className={`chat-message-container-${sender}`}>
            {sender==='robot' && (
                <img src={RobotProfileImage} className='chat-message-profile' />
            )}
            <div>
                <p className='chat-message-contents'>{message}</p> 
                {time && <span className='chat-message-time'>{time}</span>}
            </div>
            {sender==='user' && (
                <img src={UserProfileImage} className='chat-message-profile'/>
            )}
        </div>
    );
};
