import { CheatPage } from '../../../components/cheat/CheatPage';

describe('<SignInPage /> component', () => {
  const setUp = () => {
    const props = {
      isFetching: false,
      allGitCheats: [
        {
          name: 'Install Git',
          cheats: [{}]
        }
      ],
      getCheats: jest.fn(() => Promise.resolve()),
      logout: jest.fn(),
      username: 'some_user',
      history: {
        push: jest.fn()
      },
      searchCheats: jest.fn()
    };
    const state = {
      isDisplayed: false,
      cheatId: '0',
      searchText: ''
    };
    return {
      shallowWrapper: shallow(<CheatPage {...props} />),
      state,
      props
    };
  };

  const event = {
    target: {
      searchText: 'push'
    },
    preventDefault: jest.fn(),
    persist: jest.fn()
  };

  it('render without crashing', () => {
    const { shallowWrapper } = setUp();
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should display <Loader /> component when `isFetching` is set to true', () => {
    const { shallowWrapper, props } = setUp();
    shallowWrapper.setProps({
      ...props,
      isFetching: true
    });

    expect(shallowWrapper.find('MDSpinner')).toHaveLength(1);
    expect(shallowWrapper.find('SearchBar')).toHaveLength(0);
    expect(shallowWrapper.find('CategoryList')).toHaveLength(0);
  });

  it('invokes componentDidMount method', () => {
    const { shallowWrapper, props } = setUp();
    const componentDidMountSpy = jest.spyOn(
      shallowWrapper.instance(),
      'componentDidMount'
    );
    shallowWrapper.instance().componentDidMount();

    expect(componentDidMountSpy).toHaveBeenCalled();
    expect(props.getCheats).toHaveBeenCalled();
  });

  it('invokes handleOnChange method', () => {
    const { shallowWrapper } = setUp();
    const handleOnChangeSpy = jest.spyOn(
      shallowWrapper.instance(),
      'handleOnChange'
    );
    shallowWrapper.instance().handleOnChange(event);
    expect(handleOnChangeSpy).toHaveBeenCalledWith(event);
  });

  it('invokes handleToggleDisplay method', () => {
    const { shallowWrapper } = setUp();
    const handleToggleDisplaySpy = jest.spyOn(
      shallowWrapper.instance(),
      'handleToggleDisplay'
    );
    shallowWrapper.instance().handleToggleDisplay('cheatId');

    expect(handleToggleDisplaySpy).toHaveBeenCalledWith('cheatId');
  });

  it('invokes handleCheatSearch method', () => {
    const { props } = setUp();
    const mountWrapper = mount(<CheatPage {...props} />);

    mountWrapper
      .find('SearchBar')
      .find('input')
      .simulate('change');
    expect(props.searchCheats).toHaveBeenCalled();
  });

  it('should logout user', () => {
    const { props } = setUp();
    const mountWrapper = mount(<CheatPage {...props} />);

    mountWrapper
      .find('NavbarPage')
      .find('button')
      .simulate('click');

    expect(props.logout).toHaveBeenCalled();
  });
});
