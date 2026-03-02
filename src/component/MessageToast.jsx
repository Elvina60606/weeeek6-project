import { useSelector } from "react-redux";

const MessageToast =() => {
    const messages = useSelector((state) => {
        return state.message?.messages
    });

    return(<>
        <div className="toast-container position-fixed top-0 end-0 p-3">
            {messages?.map((message) => (
                    <div className="toast show" 
                         key={message.id}
                        role="alert">
                        <div className={`toast-header text-white bg-${message.type}`}>
                            <strong className="me-auto">{message.title}</strong>
                            <button type="button" 
                                    className="btn-close" 
                                    aria-label="Close">
                            </button>
                        </div>
                        <div className="toast-body text-center">
                            {message.text}
                        </div>
                    </div>
                ))
            }
        </div>
    </>)
}

export default MessageToast;