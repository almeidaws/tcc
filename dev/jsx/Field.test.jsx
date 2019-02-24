import React from 'react';
import Field from './Field.jsx';
import renderer from 'react-test-renderer';

it('<Field /> should render email', () => {
    const component = renderer.create(<Field type='email'
                                             placeholder='example@gmail.com'
                                             className='form-control'
                                             value='paulo@gmail.com' />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('<Field /> should present an error', () => {
    const component = renderer.create(<Field type='email'
                                             placeholder='example@gmail.com'
                                             className='form-control'
                                             value='paulo@gmail.com'
                                             errorMessage='Invalid email' />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

