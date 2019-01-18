import cheatActions, {
  searchCheats
} from '../../actions/creators/cheatsAction';
import types from '../../actions/types';
import mockData from '../__mock__/data';

describe('grocery actions', () => {
  let store;
  beforeEach(() => {
    store = storeMock({});
    moxios.install();
  });
  afterEach(() => moxios.uninstall());

  it('should return `CHEATS_FETCH_SUCCESS`', async done => {
    moxios.stubRequest('/api/cheats', {
      status: 200,
      response: mockData.cheatsResponse
    });

    const expectedActions = [
      { type: types.IS_FETCHING, bool: true },
      { type: types.CHEATS_FETCH_SUCCESS, gitCheats: [] },
      { type: types.IS_FETCHING, bool: false }
    ];

    await store.dispatch(cheatActions());
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('should return `CHEATS_FETCH_FAILURE`', async done => {
    const { message } = mockData.cheatsErrorResponse;
    moxios.stubRequest('/api/cheats', {
      status: 500,
      response: mockData.cheatsErrorResponse
    });

    const expectedActions = [
      { type: types.IS_FETCHING, bool: true },
      { type: types.CHEATS_FETCH_FAILURE, error: message },
      { type: types.IS_FETCHING, bool: false }
    ];

    await store.dispatch(cheatActions());
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('should return `SEARCH_RESPONSE` when search word matches the `category name`', async done => {
    const state = {
      gitCheats: {
        allGitCheats: [
          {
            name: 'install git'
          }
        ]
      }
    };

    store = storeMock(state);

    const expectedActions = [
      { type: types.SEARCH_RESPONSE, searchData: state.gitCheats.allGitCheats }
    ];

    await store.dispatch(searchCheats('install git'));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it(
    'should return `SEARCH_RESPONSE` when search word does not matche the `category name`,' +
      'matches the `description`',
    async done => {
      const state = {
        gitCheats: {
          allGitCheats: [
            {
              name: 'install git',
              cheats: [
                {
                  description: 'push'
                }
              ]
            }
          ]
        }
      };

      store = storeMock(state);

      const expectedActions = [
        {
          type: types.SEARCH_RESPONSE,
          searchData: state.gitCheats.allGitCheats
        }
      ];

      await store.dispatch(searchCheats('push'));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    }
  );

  it(
    'should return `SEARCH_RESPONSE` when search word does not matche the `category name`,' +
      'and the `description` but matches the `command`',
    async done => {
      const state = {
        gitCheats: {
          allGitCheats: [
            {
              name: 'install git',
              cheats: [
                {
                  description: 'push',
                  command: 'pull'
                }
              ]
            }
          ]
        }
      };

      store = storeMock(state);

      const expectedActions = [
        {
          type: types.SEARCH_RESPONSE,
          searchData: state.gitCheats.allGitCheats
        }
      ];

      await store.dispatch(searchCheats('pull'));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    }
  );
});
