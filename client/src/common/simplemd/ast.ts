import styles from './styles'

const bolderRegStr = '\\*{2}(.*?)\\*{2}'
const codeRegStr = '\\`(.*?)\\`'
const lineRegStr = '\\~(.*?)\\~'
const imageRegStr = '\\!\\[(.*?)\\]\\((.*?)\\)'

function bolder(content: string, ast: any[]) {
  const reg = new RegExp('^' + bolderRegStr)
  const res = reg.exec(content) || []
  const match = res[0] || ''
  if(!match) return content
  ast.push({
    style: styles.BOLDER,
    text: res[1] || ''
  })
  return content.slice(match.length)
}

function code(content: string, ast: any[]) {
  const reg = new RegExp('^' + codeRegStr)
  const res = reg.exec(content) || []
  const match = res[0] || ''
  if(!match) return content
  ast.push({
    style: styles.CODE,
    text: res[1] || ''
  })
  return content.slice(match.length)
}

function line(content: string, ast: any[]) {
  const reg = new RegExp('^' + lineRegStr)
  const res = reg.exec(content) || []
  const match = res[0] || ''
  if(!match) return content
  ast.push({
    style: styles.LINE,
    text: res[1] || ''
  })
  return content.slice(match.length)
}

function image(content: string, ast: any[]) {
  const reg = new RegExp('^' + imageRegStr)
  const res = reg.exec(content) || []
  const match = res[0] || ''
  if(!match) return content
  ast.push({
    style: styles.IMAGE,
    alt: res[1] || '',
    src: res[2]
  })
  return content.slice(match.length)
}

function common(content: string, ast: any[]) {
  const reg = new RegExp(`^(.*?)(?=${bolderRegStr}|${lineRegStr}|${codeRegStr}|${imageRegStr}|$)`)
  const res = reg.exec(content) || []
  const match = res[0] || ''
  if(!match) return content
  ast.push({
    text: match
  })
  return content.slice(match.length)
}

function simpleMdAST(mdStr: string) {
  let ast: any[] = []
  let txt = mdStr
  while(txt) {
    let nextTxt = txt
    nextTxt = code(nextTxt, ast)
    nextTxt = bolder(nextTxt, ast)
    nextTxt = line(nextTxt, ast)
    nextTxt = image(nextTxt, ast)
    nextTxt = common(nextTxt, ast)
    if(nextTxt === txt) {
      ast.push({
        text: nextTxt || ''
      })
      nextTxt = ''
    }
    txt = nextTxt
  }
  return ast
}

export default simpleMdAST
