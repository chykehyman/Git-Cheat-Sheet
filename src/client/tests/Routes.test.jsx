import { Provider } from 'react-redux';
import Routes from '../routes/Index';
import SignInPage from '../components/auth/SignInPage';
import SignUpPage from '../components/auth/SignUpPage';
import CheatsPage from '../components/cheat/CheatPage';
import NotFoundPage from '../components/common/NotFoundPage';
import appStore from '../store/config';

const renderRoutes = path =>
  mount(
    <MemoryRouter initialEntries={[path]}>
      <Provider store={appStore}>
        <Routes />
      </Provider>
    </MemoryRouter>
  );

describe('<Routes /> component', () => {
  it('renders <SignInPage /> component', () => {
    const component = renderRoutes('/');

    expect(component.find(SignInPage)).toHaveLength(1);
  });

  it('renders <SignInPage /> component', () => {
    const component = renderRoutes('/signin');

    expect(component.find(SignInPage)).toHaveLength(1);
  });

  it('renders <SignUpPage /> component', () => {
    const component = renderRoutes('/signup');

    expect(component.find(SignUpPage)).toHaveLength(1);
  });

  it('renders <CheatsPage /> component', () => {
    const component = renderRoutes('/cheats');

    expect(component.find(CheatsPage)).toHaveLength(1);
  });

  it('renders not found page for invalid routes', () => {
    const component = renderRoutes('/invalidRoute');

    expect(component.find(NotFoundPage)).toHaveLength(1);
  });
});
