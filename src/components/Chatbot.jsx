import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaPaperPlane, FaTimes, FaThumbsUp, FaThumbsDown, FaMicrophone, FaStop, FaKeyboard, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { chatbotService } from '../services/chatbotService';

const Chatbot = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            text: "Hello! I'm your bus booking assistant. I can help you with:\n- Project overview\n- Blockchain features\n- Payment methods\n- Smart contract details\n- Technical stack\n- Booking process\n- Ticket management\n- Security features\n\nWhat would you like to know?",
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString(),
            quickReplies: [
                "Tell me about blockchain features",
                "How do payments work?",
                "What's the booking process?",
                "Explain smart contracts"
            ]
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeechSupported, setIsSpeechSupported] = useState(false);
    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);
    const chatWindowRef = useRef(null);

    useEffect(() => {
        // Check if speech recognition is supported
        const checkSpeechSupport = () => {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                setIsSpeechSupported(true);
                initializeSpeechRecognition(SpeechRecognition);
            } else {
                setIsSpeechSupported(false);
                console.warn('Speech recognition not supported in this browser');
            }
        };

        const initializeSpeechRecognition = (SpeechRecognition) => {
            try {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = false;
                recognitionRef.current.interimResults = true;
                recognitionRef.current.lang = 'en-US';

                recognitionRef.current.onstart = () => {
                    setIsListening(true);
                    toast.success('Listening...');
                };

                recognitionRef.current.onend = () => {
                    setIsListening(false);
                    setIsRecording(false);
                };

                recognitionRef.current.onresult = (event) => {
                    const transcript = Array.from(event.results)
                        .map(result => result[0])
                        .map(result => result.transcript)
                        .join('');
                    setInput(transcript);
                    toast.success('Voice input received');
                };

                recognitionRef.current.onerror = (event) => {
                    console.error('Speech recognition error:', event.error);
                    setIsListening(false);
                    setIsRecording(false);
                    
                    switch (event.error) {
                        case 'no-speech':
                            toast.error('No speech detected');
                            break;
                        case 'aborted':
                            toast.error('Speech recognition aborted');
                            break;
                        case 'audio-capture':
                            toast.error('No microphone detected');
                            break;
                        case 'network':
                            toast.error('Network error occurred');
                            break;
                        case 'not-allowed':
                            toast.error('Microphone access denied');
                            break;
                        case 'service-not-allowed':
                            toast.error('Speech recognition service not allowed');
                            break;
                        default:
                            toast.error('Speech recognition failed');
                    }
                };
            } catch (error) {
                console.error('Error initializing speech recognition:', error);
                setIsSpeechSupported(false);
                toast.error('Failed to initialize speech recognition');
            }
        };

        checkSpeechSupport();

        // Add animation classes on mount
        if (chatWindowRef.current) {
            chatWindowRef.current.classList.add('animate-fade-in');
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        // Add user message with animation
        const userMessage = { 
            text: input, 
            sender: 'user',
            timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            // Get current page context
            const currentPage = location.pathname.split('/')[1] || 'home';
            const context = { currentPage };

            // Get response from chatbot service
            const response = await chatbotService.getResponse(input, context);
            setMessages(prev => [...prev, { 
                text: response, 
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString(),
                quickReplies: getQuickReplies(response)
            }]);
        } catch (error) {
            console.error('Error getting bot response:', error);
            toast.error('Failed to get response from chatbot');
        } finally {
            setIsTyping(false);
        }
    };

    const getQuickReplies = (response) => {
        if (response.includes('blockchain')) {
            return ["How do NFTs work?", "What's the smart contract?", "Tell me about payments"];
        } else if (response.includes('payment')) {
            return ["UPI details", "Ethereum payments", "Card payments"];
        }
        return ["Tell me more", "Give me an example", "What else can you help with?"];
    };

    const handleQuickReply = (reply) => {
        setInput(reply);
        handleSend();
    };

    const startRecording = async () => {
        if (!isSpeechSupported) {
            toast.error('Speech recognition not supported in your browser');
            return;
        }

        try {
            // Request microphone permission
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop()); // Stop the stream after getting permission
            
            if (recognitionRef.current) {
                recognitionRef.current.start();
                setIsRecording(true);
            }
        } catch (error) {
            console.error('Error accessing microphone:', error);
            toast.error('Microphone access denied');
        }
    };

    const stopRecording = () => {
        if (recognitionRef.current && isRecording) {
            recognitionRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleFeedback = (messageIndex, isPositive) => {
        setMessages(prev => prev.map((msg, idx) => {
            if (idx === messageIndex) {
                return { ...msg, feedback: isPositive ? 'positive' : 'negative' };
            }
            return msg;
        }));
        toast.success(`Thank you for your feedback!`);
    };

    return (
        <>
            {/* Chatbot Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all z-50 hover:scale-105 transform animate-bounce hover:animate-pulse"
            >
                <FaRobot className="text-2xl" />
            </button>

            {/* Chatbot Window */}
            {isOpen && (
                <div 
                    ref={chatWindowRef}
                    className={`fixed ${isMinimized ? 'bottom-32 right-8 w-64 h-16' : 'bottom-32 right-8 w-96 h-[500px]'} bg-white dark:bg-neutral-800 rounded-lg shadow-xl flex flex-col z-50 transform transition-all duration-300 animate-fade-in`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                        <div className="flex items-center gap-2">
                            <FaRobot className="text-white animate-bounce" />
                            <h3 className="font-semibold">Bus Booking Assistant</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsMinimized(!isMinimized)}
                                className="text-white hover:text-neutral-200 transition-colors hover:scale-110 transform"
                            >
                                {isMinimized ? 'Maximize' : 'Minimize'}
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-neutral-200 transition-colors hover:scale-110 transform"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    </div>

                    {!isMinimized && (
                        <>
                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50 dark:bg-neutral-900">
                                {messages.map((message, index) => (
                                    <div 
                                        key={index} 
                                        className="space-y-2 animate-fade-in"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div
                                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] p-3 rounded-lg transform transition-all duration-300 hover:scale-105 ${
                                                    message.sender === 'user'
                                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                                                        : 'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 shadow-sm'
                                                }`}
                                            >
                                                {message.text.split('\n').map((line, i) => (
                                                    <p key={i} className="animate-fade-in">{line}</p>
                                                ))}
                                                <span className="text-xs opacity-70 mt-1 block">
                                                    {message.timestamp}
                                                </span>
                                            </div>
                                        </div>
                                        {message.sender === 'bot' && message.quickReplies && (
                                            <div className="flex flex-wrap gap-2 justify-start animate-fade-in">
                                                {message.quickReplies.map((reply, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => handleQuickReply(reply)}
                                                        className="px-3 py-1 text-sm bg-neutral-200 dark:bg-neutral-700 rounded-full hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all transform hover:scale-105"
                                                    >
                                                        {reply}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        {message.sender === 'bot' && (
                                            <div className="flex gap-2 justify-start animate-fade-in">
                                                <button
                                                    onClick={() => handleFeedback(index, true)}
                                                    className={`text-sm transform transition-all hover:scale-110 ${
                                                        message.feedback === 'positive' 
                                                            ? 'text-green-500 animate-bounce' 
                                                            : 'text-neutral-400'
                                                    }`}
                                                >
                                                    <FaThumbsUp />
                                                </button>
                                                <button
                                                    onClick={() => handleFeedback(index, false)}
                                                    className={`text-sm transform transition-all hover:scale-110 ${
                                                        message.feedback === 'negative' 
                                                            ? 'text-red-500 animate-bounce' 
                                                            : 'text-neutral-400'
                                                    }`}
                                                >
                                                    <FaThumbsDown />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start animate-fade-in">
                                        <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-sm">
                                            <div className="flex space-x-2">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-b-lg">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="Ask about the project..."
                                        className="flex-1 px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-900 transition-all duration-300 focus:scale-105"
                                    />
                                    <div className="flex gap-2">
                                        {isSpeechSupported && (
                                            <button
                                                onClick={isRecording ? stopRecording : startRecording}
                                                className={`p-2 rounded-lg transform transition-all duration-300 hover:scale-110 ${
                                                    isRecording 
                                                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                                                        : 'bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600'
                                                } text-white`}
                                                title={isRecording ? 'Stop Recording' : 'Start Recording'}
                                            >
                                                {isListening ? <FaSpinner className="animate-spin" /> : isRecording ? <FaStop /> : <FaMicrophone />}
                                            </button>
                                        )}
                                        <button
                                            onClick={handleSend}
                                            disabled={!input.trim() || isTyping}
                                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-110"
                                        >
                                            <FaPaperPlane />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default Chatbot; 