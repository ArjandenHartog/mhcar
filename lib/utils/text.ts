// Types for Sanity block content
interface BlockChild {
  text: string
  _type?: string
}

interface Block {
  _type: string
  children?: BlockChild[]
}

type Content = string | Block[] | null | undefined

// Utility function to extract plain text from Sanity block content
export function extractPlainText(content: Content): string {
  if (!content) return ''
  
  // If it's already a string, return it
  if (typeof content === 'string') return content
  
  // If it's an array (block content), extract text
  if (Array.isArray(content)) {
    return content
      .map(block => {
        if (block._type === 'block' && block.children) {
          return block.children.map((child: BlockChild) => child.text).join('')
        }
        return ''
      })
      .join(' ')
      .trim()
  }
  
  // Fallback
  return String(content || '')
}