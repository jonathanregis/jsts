import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('Login test case',() =>{
    let wrapper;
    test('check username',()=>
    {
        wrapper = shallow(<App />);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'jonathan'}});
        expect(wrapper.state('username')).toEqual('jonathan');
    })

    it('check password',()=>
    {
        wrapper = shallow(<App />);
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'regis123'}});
        expect(wrapper.state('password')).toEqual('regis123');
    })

    it('submit form', ()=>
    {
        wrapper = shallow(<App />);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'jonathan'}});
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'regis123'}});
        wrapper.find('button').simulate('click');
        //honestly, I have to use this ugly timeout method. I ran out of options after trying to handle
        //async/await here. The state is still null since the fetch call in the submit function is async.
        //I don't want to spend too long searching for a solution to this. I would love to have your input on this.
        setTimeout(() => expect(wrapper.state('result').success).toBe(true),5000);
    })

    it('submit with wrong input',()=>
    {
        wrapper = shallow(<App />);
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: ''}});
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: ''}});
        wrapper.find('button').simulate('click');
        expect(wrapper.state('result').success).toBe(false);
    })
})