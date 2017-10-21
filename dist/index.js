'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lifecycleEvents = ['componentWillMount', 'render', 'componentDidMount', 'componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount'];

var isFunction = function isFunction(checkFunc) {
  return checkFunc && {}.toString.call(checkFunc) === '[object Function]';
};

var injectToComponent = function injectToComponent(Component) {
  for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }

  return _react2.default.createClass(_extends({
    render: function render() {
      return _react2.default.createElement(Component, _extends({}, this.props, this.state));
    }
  }, lifecycleProps.apply(undefined, props)));
};

var lifecycleProps = function lifecycleProps(props) {
  var result = {};
  lifecycleEvents.forEach(function (hook) {
    if (props && isFunction(props[hook])) {
      result[hook] = function () {
        var _props;

        (_props = this.props)[hook].apply(_props, arguments);
      };
    }
  });
  return result;
};

var lifecycleConnect = function lifecycleConnect(stateProps, dispatchProps, mergeProps) {
  return function (Component) {
    var Container = injectToComponent(Component, dispatchProps, mergeProps);
    return (0, _reactRedux.connect)(stateProps, dispatchProps, mergeProps)(Container);
  };
};

exports.default = lifecycleConnect;