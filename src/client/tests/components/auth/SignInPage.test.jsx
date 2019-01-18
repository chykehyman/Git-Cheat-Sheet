import { SignInPage } from '../../../components/auth/SignInPage';

describe('<SignInPage /> component', () => {
  const setUp = () => {
    const props = {
      authError: '',
      isProcessing: false,
      signInAction: jest.fn(() => Promise.resolve()),
      history: {
        push: jest.fn()
      }
    };
    const state = {
      data: {
        username: '',
        password: ''
      },
      errors: {}
    };
    return {
      shallowWrapper: shallow(<SignInPage {...props} />),
      state,
      props
    };
  };

  const event = {
    target: {
      username: 'new_user',
      pasword: 'password'
    },
    preventDefault: jest.fn(),
    persist: jest.fn()
  };

  it('render without crashing', () => {
    const { shallowWrapper } = setUp();
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should display <Loader /> component when `isProcessing` is set to true', () => {
    const { shallowWrapper, props } = setUp();
    shallowWrapper.setProps({
      ...props,
      isProcessing: true
    });
    expect(shallowWrapper.find('MDSpinner')).toHaveLength(1);
  });

  it('invokes handleOnChange method', () => {
    const { shallowWrapper } = setUp();
    const handleOnChangeSpy = jest.spyOn(
      shallowWrapper.instance(),
      'handleOnChange'
    );
    shallowWrapper.instance().handleOnChange(event);
    expect(handleOnChangeSpy).toHaveBeenCalled();
  });

  it('invokes handleOnFocus method', () => {
    const { shallowWrapper } = setUp();
    const handleOnFocusSpy = jest.spyOn(
      shallowWrapper.instance(),
      'handleOnFocus'
    );
    shallowWrapper.instance().handleOnFocus(event);

    expect(handleOnFocusSpy).toHaveBeenCalled();
  });

  it('invokes handleOnSubmit method', () => {
    const { shallowWrapper } = setUp();
    const handleOnSubmitSpy = jest.spyOn(
      shallowWrapper.instance(),
      'handleOnSubmit'
    );
    shallowWrapper.instance().handleOnSubmit(event);

    expect(handleOnSubmitSpy).toHaveBeenCalled();
  });

  it('should signin user when all validations are met', () => {
    const { shallowWrapper, state } = setUp();

    shallowWrapper.setState({
      ...state,
      data: {
        username: 'some_user',
        password: 'password'
      }
    });
    shallowWrapper.find('form').simulate('submit', event);

    expect(shallowWrapper.instance().state.errors).toEqual({});
  });

  it('should not signin user when username or password is fails authentication', () => {
    const { shallowWrapper, state, props } = setUp();

    shallowWrapper.setState({
      ...state,
      data: {
        username: 'some_user',
        password: 'password'
      }
    });

    shallowWrapper.setProps({
      ...props,
      authError: 'Username or passowrd is invalid'
    });
    shallowWrapper.find('form').simulate('submit', event);

    expect(shallowWrapper.instance().state.errors).toEqual({});
  });
});
