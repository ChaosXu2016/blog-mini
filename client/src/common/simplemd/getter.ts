import split from './split'

function textGetter(content) {
  const splitContent = split(content)
  return splitContent.map(item1 => item1.content.map(item => item.text).join('')).join('')
}

function titleGetter(content) {
  const splitContent = split(content)
  return splitContent[0].content.map(item => item.text).join('')
}

export {
  textGetter,
  titleGetter
}
