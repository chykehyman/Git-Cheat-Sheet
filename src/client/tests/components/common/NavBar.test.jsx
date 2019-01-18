import NavBar from '../../../components/common/NavBar';

describe('<NavBar /> component', () => {
  const props = {
    logout: jest.fn(),
    username: 'testname'
  };
  const shallowWrapper = shallow(<NavBar {...props} />);

  it('renders the header component without crashing', () => {
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should have two children', () => {
    expect(shallowWrapper.find('div').props().children).toHaveLength(4);
  });
  it('should have a button with text `T` as initials of currently signed in user', () => {
    expect(shallowWrapper.find('button').text()).toEqual(
      props.username[0].toUpperCase()
    );
  });
  it('should call `logout` function when button is clicked', () => {
    shallowWrapper.find('button').simulate('click');
    expect(props.logout).toHaveBeenCalled();
  });
  it('should have a header text of `Git Cheat Sheet`', () => {
    expect(shallowWrapper.find('h4').text()).toEqual('Git Cheat Sheet');
  });
});
