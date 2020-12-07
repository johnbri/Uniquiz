import '../../css/quiz.css';

const chatView= ({setUserMessages, handleSubmit}) =>
    <div>
        <div>
    <input onChange={(text) => setUserMessages(text.target.value)}></input>
    <button onClick={() => handleSubmit()}>submit message</button>
    </div>
    {setUserMessages.map((message) => {
        <div key={message.id}>
            <span>{message.id}</span>
            {"  "}
            <span>{message.content}</span>
        </div>
    })}
    </div>
    

