import React from 'react';
import LoginModal from './LoginModal.jsx';
import renderer from 'react-test-renderer';

it('<LoginModal /> should render static content', () => {
    const component = renderer.create(<LoginModal />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
