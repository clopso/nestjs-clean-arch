import { SearchParams } from '../../searchable-repository-contracts';

describe('Searchable Repository unit tests', () => {
  describe('SearchParams tests', () => {
    it('page prop', () => {
      const params = [
        { page: null, expect: 1 },
        { page: undefined, expect: 1 },
        { page: '', expect: 1 },
        { page: 'teste', expect: 1 },
        { page: 0, expect: 1 },
        { page: -1, expect: 1 },
        { page: 5.5, expect: 1 },
        { page: true, expect: 1 },
        { page: false, expect: 1 },
        { page: {}, expect: 1 },
        { page: 1, expect: 1 },
        { page: 2, expect: 2 },
      ];

      params.forEach((param) => {
        expect(new SearchParams({ page: param.page as any }).page).toBe(param.expect);
      });
    });

    it('perPage prop', () => {
      const params = [
        { perPage: null, expect: 15 },
        { perPage: undefined, expect: 15 },
        { perPage: '', expect: 15 },
        { perPage: 'teste', expect: 15 },
        { perPage: 0, expect: 15 },
        { perPage: -1, expect: 15 },
        { perPage: 5.5, expect: 15 },
        { perPage: true, expect: 15 },
        { perPage: false, expect: 15 },
        { perPage: {}, expect: 15 },
        { perPage: 1, expect: 1 },
        { perPage: 2, expect: 2 },
        { perPage: 25, expect: 25 },
      ];

      params.forEach((param) => {
        expect(new SearchParams({ perPage: param.perPage as any }).perPage).toBe(param.expect);
      });
    });
  });
});
