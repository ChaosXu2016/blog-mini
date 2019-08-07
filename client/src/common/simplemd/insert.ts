function getCursorLine(splitValue, cursor) {
  let index = 0
  const lineIndex = splitValue.findIndex(item => {
    index = item.length + 1 + index
    return index > cursor
  })
  return lineIndex === -1 ? 0 : lineIndex
}

export default {
  h1(str: string, cursor: number) {
    const splitStr = str.split('\n')
    const line = getCursorLine(splitStr, cursor)
    splitStr[line] = `# ${splitStr[line]}`
    return {
      value: splitStr.join('\n'),
      cursor: cursor + 2
    }
  },
  h2(str: string, cursor: number) {
    const splitStr = str.split('\n')
    const line = getCursorLine(splitStr, cursor)
    splitStr[line] = `## ${splitStr[line]}`
    return {
      value: splitStr.join('\n'),
      cursor: cursor + 3
    }
  },
  h3(str: string, cursor: number) {
    const splitStr = str.split('\n')
    const line = getCursorLine(splitStr, cursor)
    splitStr[line] = `### ${splitStr[line]}`
    return {
      value: splitStr.join('\n'),
      cursor: cursor + 4
    }
  },
  h4(str: string, cursor) {
    const splitStr = str.split('\n')
    const line = getCursorLine(splitStr, cursor)
    splitStr[line] = `#### ${splitStr[line]}`
    return {
      value: splitStr.join('\n'),
      cursor: cursor + 5
    }
  },
  quote(str: string, cursor: number) {
    const splitStr = str.split('\n')
    const line = getCursorLine(splitStr, cursor)
    splitStr[line] = `> ${splitStr[line]}`
    return {
      value: splitStr.join('\n'),
      cursor: cursor + 2
    }
  },
  bolder(str: string, cursor: number) {
    const splitStr = str.split('')
    splitStr.splice(cursor, 0, '****')
    return {
      value: splitStr.join(''),
      cursor: cursor + 2
    }
  },
  code(str: string, cursor: number) {
    const splitStr = str.split('')
    splitStr.splice(cursor, 0, '``')
    return {
      value: splitStr.join(''),
      cursor: cursor + 1
    }
  },
  image(str: string, cursor: number, id: string) {
    const splitStr = str.split('')
    splitStr.splice(cursor, 0, `![image](${id})`)
    return {
      value: splitStr.join(''),
      cursor: cursor + 9
    }
  }
}