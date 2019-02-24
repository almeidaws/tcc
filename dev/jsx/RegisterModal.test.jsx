import React from 'react';
import renderer from 'react-test-renderer';
import RegisterModal from './RegisterModal';

it('<RegisterModal /> should render static content', () => {
    const component = renderer.create(<RegisterModal />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});