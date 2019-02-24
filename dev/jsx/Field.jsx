import React from 'react';

/**
 * This field was created to be used on modals used to register
 * and login the user. It contains a set os props and also allow
 * set a error message. It doesn't have state.
 *
 * Property type: the same from HTML elements. Examples: 'email', 'password'.
 * Property placeholder: the same from HTML elements. Example: 'Your email...'.
 * Property value: the current value of this field. It's a controlled component.
 * Property onChange: callback called when the field's value changes. The generated
 * event is sent as argument.
 * Property required: 'true' if the field must contains some value or 'false' otherwise.
 * Property icon: icon's name rendered on the field. This name are that used on bootstrap.
 * Example: 'evelope', 'lock', etc.
 * Property errorMessage: If this value is setted, an error message is presented below
 * the field. If there's no error this the value must be some JavaScript's falsy value
 * like 'null' of 'undefined'.
 */
const Field = props => (
    <div className="form-group">
        <input 
            type={props.type} 
            placeholder={props.placeholder} 
            className="form-control" 
            value={props.value} 
            onChange={props.onChange}
            required={props.required}/>
        <span className="form_icon">
            <i className={"fa_icon form-" + props.icon} aria-hidden="true" />
        </span>
        <div className="invalid-feedback text-warning">{props.errorMessage}</div>
    </div>
);

export default Field;
