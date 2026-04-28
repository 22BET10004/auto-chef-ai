'use client'

import AppNav from '@/components/AppNav'
import ChatbotAssistant from '@/components/ChatbotAssistant'
import ProtectedPage from '@/components/ProtectedPage'

export default function ChatPage() {
  return (
    <ProtectedPage>
      <main className="container">
        <AppNav />
        <div className="grid">
          <ChatbotAssistant />
        </div>
      </main>
    </ProtectedPage>
  )
}
