import React from 'react';
import EmailField from './EmailField.jsx';
import renderer from 'react-test-renderer';

it('<EmailField /> should render email', () => {
    const component = renderer.create(<EmailField
                                        value="email.teste@gmail.com"
                                        />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('<EmailField /> should present an error', () => {
    const component = renderer.create(<EmailField
                                        value="asds/"
                                        />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});