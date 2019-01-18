import NotFoundPage from '../../../components/common/NotFoundPage';

const props = {
  history: {
    location: {
      pathname: ''
    }
  }
};

describe('<NotFoundPage /> component test', () => {
  it('renders 404(not found page) component without crashing', () => {
    const shallowWrapper = shallow(<NotFoundPage {...props} />);
    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
