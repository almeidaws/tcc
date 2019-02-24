import React from 'react';
import Header from './Header.jsx';
import renderer from 'react-test-renderer';
import Utils from './../js/Utils.js';
const U = Utils;

beforeEach(() => { U.deleteAllCookies });

it('<Header /> should render register/login buttons', () => {
    const component = renderer.create(<Header />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('<Header /> should render user\'s profile menus and name', () => {
    U.setCookie('name', 'Carlos', 1);
    const component = renderer.create(<Header />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
