import React from 'react';
import renderer from 'react-test-renderer';
import UploadForm from './UploadForm';

it('<UploadForm /> should render static content', () => {
    const component = renderer.create(<UploadForm />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
