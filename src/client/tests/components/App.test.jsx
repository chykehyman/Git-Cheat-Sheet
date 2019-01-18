import App from '../../components/App';

describe('<App /> component', () => {
  it('should render without crashing', () => {
    expect(toJson(shallow(<App />))).toMatchSnapshot();
  });
});
