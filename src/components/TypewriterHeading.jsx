import { Children, cloneElement, Fragment, isValidElement, useEffect, useState } from 'react'

function getText(node) {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getText).join('')
  if (!isValidElement(node)) return ''
  if (node.type === 'br') return ' '
  return getText(node.props.children)
}

function getCharacterCount(node) {
  if (typeof node === 'string' || typeof node === 'number') return String(node).length
  if (Array.isArray(node)) return node.reduce((total, child) => total + getCharacterCount(child), 0)
  if (!isValidElement(node) || node.type === 'br') return 0
  return getCharacterCount(node.props.children)
}

function renderTyped(node, visibleCharacters, position) {
  if (typeof node === 'string' || typeof node === 'number') {
    const text = String(node)
    if (!text) return null

    const start = position.count
    position.count += text.length
    const visibleLength = Math.max(0, Math.min(text.length, visibleCharacters - start))
    const showCaret = !position.caret && visibleCharacters <= position.count
    if (showCaret) position.caret = true

    return (
      <>
        {text.slice(0, visibleLength)}
        {showCaret && <span className="typewriter-caret" aria-hidden="true" />}
      </>
    )
  }

  if (Array.isArray(node)) {
    return Children.map(node, (child) => renderTyped(child, visibleCharacters, position))
  }

  if (!isValidElement(node)) return node
  if (node.type === 'br') return cloneElement(node)
  return cloneElement(node, undefined, renderTyped(node.props.children, visibleCharacters, position))
}

export default function TypewriterHeading({ children, className = '', ...headingProps }) {
  const text = getText(children)
  const characterCount = getCharacterCount(children)
  const [visibleCharacters, setVisibleCharacters] = useState(0)

  useEffect(() => {
    if (characterCount === 0) {
      setVisibleCharacters(characterCount)
      return
    }

    let visible = 0
    let deleting = false
    let timer

    setVisibleCharacters(0)

    function tick() {
      if (!deleting) {
        visible += 1
        setVisibleCharacters(visible)
        if (visible < characterCount) {
          timer = window.setTimeout(tick, 28)
        } else {
          timer = window.setTimeout(() => {
            deleting = true
            tick()
          }, 1000)
        }
      } else {
        visible -= 1
        setVisibleCharacters(visible)
        if (visible > 0) {
          timer = window.setTimeout(tick, 18)
        } else {
          deleting = false
          timer = window.setTimeout(tick, 200)
        }
      }
    }

    tick()
    return () => window.clearTimeout(timer)
  }, [characterCount])

  const position = { count: 0, caret: false }
  const renderedChildren = renderTyped(children, visibleCharacters, position)

  return (
    <h1
      {...headingProps}
      className={`typewriter-heading${className ? ` ${className}` : ''}`}
      aria-label={headingProps['aria-label'] || text.replace(/\s+/g, ' ').trim()}
      aria-live="off"
    >
      {renderedChildren}
    </h1>
  )
}
