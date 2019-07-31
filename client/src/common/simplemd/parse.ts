function parse(ast: any[]) {
  const stack: any[] = []
  const parseResult: any[] = []
  ast.forEach(item => {
    if(item.style) {
      if(stack.length && stack[stack.length - 1] === item.style) {
        stack.pop()
      } else {
        stack.push(item.style)
      }
    } else if(stack.length){
      parseResult.push({ style: stack[stack.length - 1], text: item.text})
    } else {
      parseResult.push(item)
    }
  })
  return parseResult
}

export default parse
