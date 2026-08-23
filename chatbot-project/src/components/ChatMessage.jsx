import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'

export function ChatMessage({message,sender}) {
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
