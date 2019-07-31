import styles from './styles'

function simpleMdAST(mdStr: string) {
  let ast: any[] = []
  let txt = ''
  for(let i = 0; i < mdStr.length; i++) {
    const c = mdStr[i]
    switch(c) {
      case '*': {
        ast.push({ text: txt})
        txt = ''
        if(mdStr[i + 1] === '*') {
          i++
          ast.push({ style: styles.BOLDER})
        } else {
          ast.push({ style: '*'})
        }
        break
      }
      case '`': {
        ast.push({ text: txt})
        txt = ''
        ast.push({ style: styles.CODE })
        break
      }
      case '~': {
        ast.push({ text: txt})
        txt = ''
        ast.push({ style: styles.LINE })
        break
      }
      default: {
        txt = txt + c
        break
      }
    }
  }
  txt && ast.push({ text: txt})
  return ast
}

export default simpleMdAST
