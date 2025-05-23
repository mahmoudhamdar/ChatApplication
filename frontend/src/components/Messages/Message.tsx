"use client"
import "./Message.css"

export const Message = ({
                            content,
                            isOwnMessage,
                        }: {
    content: string
    isOwnMessage: boolean
}) => {
    return (
        <div className={`message ${isOwnMessage ? "own-message" : "other-message"}`}>
            <div className="message-bubble">
                <p>{content}</p>
                
            </div>
        </div>
    )
}
