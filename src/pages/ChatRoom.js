import React, { useState, useEffect } from "react"
import SockJS from "sockjs-client"
import { Client, over } from "@stomp/stompjs"
import { shallowEqual, useSelector } from "react-redux"

function ChatRoom() {
  const [stompClient, setStompClient] = useState(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const userName = useSelector((state) => state.userName)
  // WebSocket 연결 함수
  useEffect(() => {
    const socket = new SockJS("/api/ws")
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str)
      },
      onConnect: () => {
        console.log("Connected to WebSocket")
        client.subscribe("/topic/public", (messageOutput) => {
          const message = JSON.parse(messageOutput.body)
          setMessages((prevMessages) => [...prevMessages, message])
        })

        // 사용자 입장 메시지 전송

        client.publish({
          destination: "/app/chat.addUser",
          body: JSON.stringify({ sender: userName }),
        })
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket")
      },
    })

    client.activate()
    setStompClient(client)

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (stompClient) {
        stompClient.deactivate()
      }
    }
  }, [])

  // 메시지 전송 함수
  const sendMessage = (event) => {
    event.preventDefault()
    if (stompClient && message.trim() !== "") {
      stompClient.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify({
          sender: userName,
          content: message,
        }),
      })
      setMessage("") // 입력 필드 비우기
    }
  }

  return (
    <div className="container">
      <h1>채팅 페이지</h1>

      <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "scroll" }}>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.type === "JOIN" ? (
              <p>
                <em>{msg.sender}님이 입장하셨습니다.</em>
              </p>
            ) : (
              <p>
                <strong>{msg.sender}:</strong> {msg.content}
              </p>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">전송</button>
      </form>
    </div>
  )
}

export default ChatRoom
