const React = require('react');
import PasswordField from './PasswordField.jsx';
const renderer = require('react-test-renderer');

it('<PasswordField /> should render password', () => {
    const component = renderer.create(<PasswordField
                                        value="myPassword"
                                        />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('<PasswordField /> should presenter an error', () => {
    const component = renderer.create(<PasswordField
                                        value="myPassword"
                                        />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});