'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  Smile, 
  Paperclip, 
  X,
  User,
  Bot,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date(Date.now() - 300000),
      status: 'delivered'
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isConnected, setIsConnected] = useState(true)
  const [agentInfo, setAgentInfo] = useState({
    name: 'Marie Dubois',
    status: 'online',
    department: 'Support technique',
    avatar: 'MD'
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: newMessage,
      timestamp: new Date(),
      status: 'sending'
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: 'Merci pour votre message. Un de nos agents va vous répondre dans quelques instants.',
        timestamp: new Date(),
        status: 'delivered'
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 2000)
  }

  const quickReplies = [
    'Comment ajouter un camion ?',
    'Problème de tracking',
    'Question de facturation',
    'Demande de fonctionnalité'
  ]

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-gray-400" />
      case 'delivered':
        return <CheckCircle className="w-3 h-3 text-green-500" />
      case 'read':
        return <CheckCircle className="w-3 h-3 text-trust" />
      default:
        return null
    }
  }

  return (
    <div className="p-6 h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-t-lg p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-trust rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-medium text-sm">{agentInfo.avatar}</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-black">{agentInfo.name}</h2>
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                agentInfo.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
              }`}></div>
              <span className="text-sm text-gray-600">{agentInfo.department}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Connection Status */}
      {!isConnected && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
            <p className="text-sm text-yellow-700">
              Connexion perdue. Tentative de reconnexion...
            </p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 bg-gray-50 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'user' 
                  ? 'bg-trust ml-2' 
                  : 'bg-trust mr-2'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              
              <div className={`px-4 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-trust text-white'
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}>
                <p className="text-sm">{message.content}</p>
                <div className={`flex items-center mt-1 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                  <span className={`text-xs ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </span>
                  {message.type === 'user' && (
                    <span className="ml-1">
                      {getStatusIcon(message.status)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex max-w-xs lg:max-w-md">
              <div className="w-8 h-8 bg-trust rounded-full flex items-center justify-center mr-2">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white text-gray-900 border border-gray-200 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">Agent en train d'écrire...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length === 1 && (
        <div className="bg-white border-t border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-3">Questions fréquentes :</p>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => setNewMessage(reply)}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="bg-white border border-gray-200 rounded-b-lg p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Tapez votre message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-transparent bg-white text-gray-700 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>
          
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-trust text-white p-3 rounded-lg hover:bg-trust-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}


