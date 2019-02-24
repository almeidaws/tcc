import React from 'react';
import Field from './Field.jsx';
import renderer from 'react-test-renderer';

it('<Field /> should render user name', () => {
    const component = renderer.create(<Field type='user'
                                             placeholder='Enter you name'
                                             className='form-control'
                                             value='Renan' />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

