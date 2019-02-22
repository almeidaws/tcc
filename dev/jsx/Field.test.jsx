const React = require('react');
const Field = require('./Field.js');
const renderer = require('react-test-renderer');

it('<Field /> should render email', () => {
    const component = renderer.create(<Field type='email'
                                             placeholder='example@gmail.com'
                                             className='form-control'
                                             value='paulo@gmail.com' />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


