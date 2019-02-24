import Field from './Field.jsx';
import React from 'react';

const EmailField = props => <Field 
                                type="email" 
                                placeholder="Enter Your Email" 
                                icon="envelope" 
                                required={true}
                                errorMessage={props.errorMessage}
                                value={props.value} 
                                onChange={props.onChange} />;
export default EmailField;