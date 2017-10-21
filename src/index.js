import React from 'react'
import { connect } from 'react-redux'

const lifecycleEvents = [
  'componentWillMount',
  'render',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount',
]

const isFunction = (checkFunc) => checkFunc && {}.toString.call(checkFunc) === '[object Function]'

const injectToComponent = (Component, ...props) => {
  return React.createClass({
    render() { return <Component { ...this.props } { ...this.state } /> },
    ...lifecycleProps(...props)
  })
}

const lifecycleProps = (props) => {
  let result = {}
  lifecycleEvents.forEach((hook) => {
    if (props && isFunction(props[hook])) {
      result[hook] = function(...args) { this.props[hook](...args) }
    }
  })
  return result
}

const lifecycleConnect = (stateProps, dispatchProps, mergeProps) => Component => {
  const Container = injectToComponent(Component, dispatchProps, mergeProps)
  return connect(stateProps, dispatchProps, mergeProps)(Container)
}

export default lifecycleConnect
