import React from 'react';
import {
  MultiChatWindow,
  MultiChatSocket,
  useMultiChatLogic,
} from 'react-chat-engine-advanced';

interface ChatInterfaceProps {
  projectId: string;
  username: string;
  secret: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  projectId,
  username,
  secret,
}) => {
  const chatProps = useMultiChatLogic(projectId, username, secret);

  return (
    <div>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow {...chatProps} />
    </div>
  );
};

export default ChatInterface;