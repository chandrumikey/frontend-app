import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceAssistant = ({ onAddTask }) => {
  const [isListening, setIsListening] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript.toLowerCase().includes('add task')) {
      const taskText = transcript.replace('add task', '').trim();
      if (taskText) {
        onAddTask(taskText);
        resetTranscript();
      }
    }
  }, [transcript, onAddTask, resetTranscript]);

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
    setIsListening(!isListening);
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div className="voice-assistant">
      <button
        onClick={toggleListening}
        className={`voice-btn ${isListening ? 'listening' : ''}`}
        title="Voice commands"
      >
        🎤 {isListening ? 'Listening...' : 'Voice'}
      </button>
      
      {isListening && (
        <div className="voice-feedback">
          <div className="voice-pulse"></div>
          <p>Say "add task [your task]"</p>
          <p>Current: {transcript}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;