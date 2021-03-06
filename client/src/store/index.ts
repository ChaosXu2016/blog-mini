import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const middlewares = [
  thunkMiddleware
]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-logger').createLogger())
}

const enhancer = compose(
  applyMiddleware(...middlewares),
  // other store enhancers if any
)

function configStore () {
  const store = createStore(rootReducer, enhancer)
  return store
}

export default configStore ()
