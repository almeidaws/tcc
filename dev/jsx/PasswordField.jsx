import Field from './Field.jsx';

const PasswordField = props => <Field 
                                    type="password" 
                                    placeholder="Enter Password" 
                                    icon="lock" 
                                    required={true}
                                    errorMessage={props.errorMessage}
                                    value={props.value} 
                                    onChange={props.onChange} />;
export default PasswordField;