const React = require('react');
import PasswordField from './PasswordField.jsx';
const renderer = require('react-test-renderer');

it('<Field /> should render password', () => {
    const component = renderer.create(<PasswordField/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
