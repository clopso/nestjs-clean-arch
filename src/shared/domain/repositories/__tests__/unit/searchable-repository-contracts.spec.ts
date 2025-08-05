import {
  SearchParams,
  SortDirection,
} from '../../searchable-repository-contracts';

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
        expect(new SearchParams({ page: param.page as any }).page).toBe(
          param.expect,
        );
      });
    });

    it('perPage prop', () => {
      const sut = new SearchParams();
      expect(sut.perPage).toEqual(15);

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
        expect(
          new SearchParams({ perPage: param.perPage as any }).perPage,
        ).toBe(param.expect);
      });
    });

    it('sort prop', () => {
      const sut = new SearchParams();
      expect(sut.sort).toBeNull();

      const params = [
        { sort: null, expect: null },
        { sort: undefined, expect: null },
        { sort: '', expect: null },
        { sort: 'teste', expect: 'teste' },
        { sort: 0, expect: '0' },
        { sort: -1, expect: '-1' },
        { sort: 5.5, expect: '5.5' },
        { sort: true, expect: 'true' },
        { sort: false, expect: 'false' },
        { sort: {}, expect: '[object Object]' },
        { sort: 1, expect: '1' },
        { sort: 2, expect: '2' },
        { sort: 25, expect: '25' },
      ];

      params.forEach((param) => {
        expect(new SearchParams({ sort: param.sort as string }).sort).toBe(
          param.expect,
        );
      });
    });

    it('sortDir prop', () => {
      let sut = new SearchParams();
      expect(sut.sortDir).toBeNull();

      sut = new SearchParams({ sort: null });
      expect(sut.sortDir).toBeNull();

      sut = new SearchParams({ sort: undefined });
      expect(sut.sortDir).toBeNull();

      sut = new SearchParams({ sort: '' });
      expect(sut.sortDir).toBeNull();

      const params = [
        { sortDir: null, expect: 'desc' },
        { sortDir: undefined, expect: 'desc' },
        { sortDir: '', expect: 'desc' },
        { sortDir: 'teste', expect: 'desc' },
        { sortDir: 0, expect: 'desc' },
        { sortDir: 'asc', expect: 'asc' },
        { sortDir: 'desc', expect: 'desc' },
        { sortDir: 'ASC', expect: 'asc' },
        { sortDir: 'DESC', expect: 'desc' },
      ];

      params.forEach((param) => {
        expect(
          new SearchParams({
            sort: 'field',
            sortDir: param.sortDir as SortDirection,
          }).sortDir,
        ).toBe(param.expect);
      });
    });
  });
});
