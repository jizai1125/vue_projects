import { createApp } from 'vue'
import Message from './Message.vue'
export type MessageType = 'success' | 'error' | 'default'

const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  const msgInstance = createApp(Message, {
    message,
    type
  })
  const msgNode = document.createElement('div')
  document.body.append(msgNode)
  msgInstance.mount(msgNode)
  setTimeout(() => {
    msgInstance.unmount()
    document.body.append(msgNode)
  }, timeout)
}

export default createMessage
