import userAuth, { logout } from '../../actions/creators/userAuthActions';
import types from '../../actions/types';
import mockData from '../__mock__/data';

describe('grocery actions', () => {
  let store;
  beforeEach(() => {
    store = storeMock({});
    moxios.install();
  });
  afterEach(() => moxios.uninstall());

  it('should logout user', () => {
    const expectedActions = [
      {
        type: types.USER_AUTH_SUCCESS,
        user: {}
      }
    ];
    store.dispatch(logout());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should return `USER_AUTH_SUCCESS` when user registers', async done => {
    const { user } = mockData;
    const data = {
      username: 'tobe',
      password: '111111',
      confirmPassword: '111111'
    };

    const route = 'signup';

    moxios.stubRequest(`/api/${route}`, {
      status: 201,
      response: mockData.authResponse
    });

    const expectedActions = [
      { type: types.IS_PROCESSING, bool: true },
      { type: types.USER_AUTH_SUCCESS, user },
      { type: types.IS_PROCESSING, bool: false }
    ];

    await store.dispatch(userAuth(data));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('should return `USER_AUTH_FAILURE` when user logs in with invalid credentials', async done => {
    const { message } = mockData.authErrorResponse;
    const data = {
      username: 'tobe',
      password: '111111'
    };

    const route = 'signin';

    moxios.stubRequest(`/api/${route}`, {
      status: 400,
      response: mockData.authErrorResponse
    });

    const expectedActions = [
      { type: types.IS_PROCESSING, bool: true },
      { type: types.USER_AUTH_FAILURE, error: message },
      { type: types.IS_PROCESSING, bool: false }
    ];

    await store.dispatch(userAuth(data));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});
