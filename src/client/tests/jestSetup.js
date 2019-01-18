import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { configure, shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';

configure({ adapter: new Adapter() });

const middleware = [thunk];
const storeMock = configureMockStore(middleware);

global.React = React;
global.MemoryRouter = MemoryRouter;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.storeMock = storeMock;
global.toJson = toJson;
global.moxios = moxios;
