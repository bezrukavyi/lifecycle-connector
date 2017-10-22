## React-Redux Lifecycle connector
Simple way for integrate react component's [lifecycle](https://reactjs.org/docs/state-and-lifecycle.html) to [redux](https://github.com/reactjs/redux) connector.

## Installation
    npm install lifecycle-connector --save

## Available react lifecycle events
- componentWillMount
- render
- componentDidMount
- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- componentDidUpdate
- componentWillUnmount

## Usage
In ```container.js```

```javascript
import lifecycleConnect from 'lifecycle-connector'
import { reduxForm } from 'redux-form'

import Component from './Component'

const mapStateToProps = () => ({
  projectsIds: [1, 2, 3],
})

const mapDispatchToProps = {
  componentDidMount: () => console.log('componentDidMount'),
  componentWillMount: () => console.log('componentWillMount'),
}

export default lifecycleConnect(mapStateToProps, mapDispatchToProps)(Component)
```

## License

The components is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
