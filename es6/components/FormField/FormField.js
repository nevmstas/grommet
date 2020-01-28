function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// eslint-disable-next-line max-len

/* eslint-disable react/no-multi-comp, react/prefer-stateless-function, max-classes-per-file */
import React, { Children, cloneElement, Component } from 'react';
import { compose } from 'recompose';
import styled, { withTheme } from 'styled-components';
import { parseMetricToNum } from '../../utils';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';
import { CheckBox } from '../CheckBox';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { withFocus } from '../hocs';
import { FormContext } from '../Form/FormContext';

var validateField = function validateField(required, validate, messages) {
  return function (value, data) {
    var error;

    if (required && (value === undefined || value === '')) {
      error = messages.required;
    } else if (validate) {
      if (Array.isArray(validate)) {
        validate.some(function (oneValidate) {
          error = validateField(false, oneValidate, messages)(value, data);
          return !!error;
        });
      } else if (typeof validate === 'function') {
        error = validate(value, data);
      } else if (validate.regexp) {
        if (!validate.regexp.test(value)) {
          error = validate.message || messages.invalid;
        }
      }
    }

    return error;
  };
};

var FormFieldBox = styled(Box).withConfig({
  displayName: "FormField__FormFieldBox",
  componentId: "m9hood-0"
})(["", ""], function (props) {
  return props.theme.formField && props.theme.formField.extend;
});

var FormFieldContent =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(FormFieldContent, _Component);

  function FormFieldContent() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "renderChildren", function (value, invalid, update) {
      var _this$props = _this.props,
          name = _this$props.name,
          checked = _this$props.checked,
          component = _this$props.component,
          required = _this$props.required,
          valueProp = _this$props.value,
          _onChange = _this$props.onChange,
          rest = _objectWithoutPropertiesLoose(_this$props, ["name", "checked", "component", "required", "value", "onChange"]);

      delete rest.className;
      var Input = component || TextInput;

      if (Input === CheckBox) {
        return React.createElement(Input, _extends({
          name: name,
          checked: value[name] !== undefined ? value[name] : checked || false,
          onChange: function onChange(event) {
            update(name, event.target.checked);
            if (_onChange) _onChange(event);
          },
          "aria-invalid": invalid || undefined
        }, rest));
      }

      return React.createElement(Input, _extends({
        name: name,
        value: value[name] !== undefined ? value[name] : valueProp || '',
        onChange: function onChange(event) {
          update(name, event.value || event.target.value || '');
          if (_onChange) _onChange(event);
        },
        plain: true,
        focusIndicator: false,
        "aria-invalid": invalid || undefined
      }, rest));
    });

    return _this;
  }

  var _proto = FormFieldContent.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props2 = this.props,
        checked = _this$props2.checked,
        context = _this$props2.context,
        name = _this$props2.name,
        value = _this$props2.value;

    if (context && context.value[name] === undefined && (value !== undefined || checked !== undefined)) {
      context.update(name, value !== undefined ? value : checked, undefined, true);
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        children = _this$props3.children,
        className = _this$props3.className,
        component = _this$props3.component,
        context = _this$props3.context,
        error = _this$props3.error,
        focus = _this$props3.focus,
        help = _this$props3.help,
        htmlFor = _this$props3.htmlFor,
        label = _this$props3.label,
        name = _this$props3.name,
        pad = _this$props3.pad,
        required = _this$props3.required,
        style = _this$props3.style,
        theme = _this$props3.theme,
        validate = _this$props3.validate,
        onBlur = _this$props3.onBlur,
        onFocus = _this$props3.onFocus,
        margin = _this$props3.margin;
    var formField = theme.formField;
    var border = formField.border;
    var normalizedError = error;
    var contents = border && children && Children.map(children, function (child) {
      if (child) {
        return cloneElement(child, {
          plain: true,
          focusIndicator: false,
          onBlur: onBlur,
          onFocus: onFocus
        });
      }

      return child;
    }) || children;
    var onFieldBlur;

    if (context) {
      var addValidation = context.addValidation,
          errors = context.errors,
          onContextBlur = context.onBlur,
          value = context.value,
          update = context.update,
          messages = context.messages;
      addValidation(name, validateField(required, validate, messages));
      normalizedError = error || errors[name];
      contents = contents || this.renderChildren(value, !!normalizedError, update);

      if (onContextBlur) {
        onFieldBlur = function onFieldBlur() {
          return onContextBlur(name);
        };
      }
    }

    if (pad) {
      contents = React.createElement(Box, formField.content, contents);
    }

    var borderColor;

    if (focus && !normalizedError) {
      borderColor = 'focus';
    } else if (normalizedError) {
      borderColor = border && border.error.color || 'status-critical';
    } else {
      borderColor = border && border.color || 'border';
    }

    var abut;
    var abutMargin;
    var outerStyle = style;

    if (border) {
      contents = React.createElement(Box, {
        ref: function ref(_ref) {
          _this2.childContainerRef = _ref;
        },
        border: border.position === 'inner' ? _extends({}, border, {
          side: border.side || 'bottom',
          color: borderColor
        }) : undefined
      }, contents);
      abut = border.position === 'outer' && (border.side === 'all' || border.side === 'horizontal' || !border.side);

      if (abut) {
        // marginBottom is set to overlap adjacent fields
        abutMargin = {
          bottom: '-1px'
        };

        if (margin) {
          abutMargin = margin;
        } else if (border.size) {
          // if the user defines a margin,
          // then the default margin below will be overriden
          abutMargin = {
            bottom: "-" + parseMetricToNum(theme.global.borderSize[border.size] || border.size) + "px"
          };
        }

        outerStyle = _extends({
          position: focus ? 'relative' : undefined,
          zIndex: focus ? 10 : undefined
        }, style);
      }
    }

    return React.createElement(FormFieldBox, {
      className: className,
      border: border && border.position === 'outer' ? _extends({}, border, {
        color: borderColor
      }) : undefined,
      margin: abut ? abutMargin : margin || _extends({}, formField.margin),
      style: outerStyle,
      onBlur: onFieldBlur
    }, label && component !== CheckBox || help ? React.createElement(React.Fragment, null, label && component !== CheckBox && React.createElement(Text, _extends({
      as: "label",
      htmlFor: htmlFor
    }, formField.label), label), help && React.createElement(Text, _extends({}, formField.help, {
      color: formField.help.color[theme.dark ? 'dark' : 'light']
    }), help)) : undefined, contents, normalizedError && React.createElement(Text, _extends({}, formField.error, {
      color: formField.error.color[theme.dark ? 'dark' : 'light']
    }), normalizedError));
  };

  return FormFieldContent;
}(Component); // Can't be a functional component because styled-components withTheme() needs
// to attach a ref.


var FormField =
/*#__PURE__*/
function (_Component2) {
  _inheritsLoose(FormField, _Component2);

  function FormField() {
    return _Component2.apply(this, arguments) || this;
  }

  var _proto2 = FormField.prototype;

  _proto2.render = function render() {
    var _this3 = this;

    return React.createElement(FormContext.Consumer, null, function (context) {
      return React.createElement(FormFieldContent, _extends({
        context: context
      }, _this3.props));
    });
  };

  return FormField;
}(Component);

FormField.defaultProps = {};
Object.setPrototypeOf(FormField.defaultProps, defaultProps);
var FormFieldDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  FormFieldDoc = require('./doc').doc(FormField);
}

var FormFieldWrapper = compose(withFocus({
  focusWithMouse: true
}), withTheme)(FormFieldDoc || FormField);
export { FormFieldWrapper as FormField };