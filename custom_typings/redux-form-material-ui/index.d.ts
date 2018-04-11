//// <reference types='material-ui'/>
//// <reference types='react'/>
declare module 'redux-form-material-ui' {
  import { SelectProps } from 'material-ui/Select';
  import { TextFieldProps } from 'material-ui/TextField';
  import * as React from 'react';
  import { WrappedFieldProps } from 'redux-form';
  export class Select extends React.Component<SelectProps, any>{}
  export class TextField extends React.Component<WrappedFieldProps & TextFieldProps>{}
  // export class TimePicker extends React.Component<__MaterialUI.TimePickerProps, any> {}
  // export class DatePicker extends React.Component<__MaterialUI.DatePicker.DatePickerProps, any> {}
  // export class RadioButtonGroup extends React.Component<__MaterialUI.Switches.RadioButtonGroupProps, any> {}
  // export class SelectField extends React.Component<__MaterialUI.SelectFieldProps, any> {}
  // export class Slider extends React.Component<__MaterialUI.SliderProps, any> {}
  // export class TextField extends React.Component<TextFieldProps, any> {}
  // export class Toggle extends React.Component<__MaterialUI.Switches.ToggleProps, any> {}
}