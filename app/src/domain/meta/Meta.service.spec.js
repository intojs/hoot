import {getMetaMock} from "./Meta.mock";
import {getCurrentPageNumber, getNext3, getPages, getPrev3, getTotalPageNumber} from "./Meta.service";

describe('Meta.service', () => {
  it('should getTotalPageNumber()', () => {
    const meta = getMetaMock({
      total_count: 314,
      limit: 33
    });
    expect(getTotalPageNumber(meta)).toEqual(9);
  });

  it('should getCurrentPageNumber', () => {
    const meta = getMetaMock({
      offset: 120,
      limit: 30
    });
    expect(getCurrentPageNumber(meta)).toEqual(4);
  });

  it('should getNext3() when the current page is not close to the edge', () => {
    const current = 4;
    const last = 80;
    const result = [];
    expect(getNext3(current, last, result)).toEqual([5, 6, 7]);
  });

  it('should getNext3() when the current page is close to the edge', () => {
    const current = 78;
    const last = 80;
    const result = [];
    expect(getNext3(current, last, result)).toEqual([79, 80]);
  });

  it('should getNext3() when the current page is very close to the edge', () => {
    const current = 79;
    const last = 80;
    const result = [];
    expect(getNext3(current, last, result)).toEqual([80]);
  });

  it('should getNext3() when the current page is at the edge', () => {
    const current = 80;
    const last = 80;
    const result = [];
    expect(getNext3(current, last, result)).toEqual([]);
  });

  it('should getPrev3() when the current page is close to the edge', () => {
    const current = 2;
    const result = [];
    expect(getPrev3(current, result)).toEqual([0, 1]);
  });

  it('should getPrev3() when the current page is very close to the edge', () => {
    const current = 1;
    const result = [];
    expect(getPrev3(current, result)).toEqual([0]);
  });

  it('should getPrev3() when the current page is at the edge', () => {
    const current = 0;
    const result = [];
    expect(getPrev3(current, result)).toEqual([]);
  });

  it('should getPages() when the offset is 0', () => {
    const meta = getMetaMock({
      limit: 20,
      offset: 0,
      total_count: 407
    });
    const result = [{
      number: 0,
      active: true,
      label: '1'
    }, {
      number: 1,
      active: false,
      label: '2'
    }, {
      number: 2,
      active: false,
      label: '3'
    }, {
      number: 3,
      active: false,
      label: '4'
    }];
    expect(getPages(meta)).toEqual(result);
  });

  it('should getPages when the offset is 20', () => {
    const meta = getMetaMock({
      limit: 20,
      next: '',
      offset: 20,
      previous: '',
      total_count: 407
    });
    const result = [{
      number: 0,
      active: false,
      label: '1'
    }, {
      number: 1,
      active: true,
      label: '2'
    }, {
      number: 2,
      active: false,
      label: '3'
    }, {
      number: 3,
      active: false,
      label: '4'
    }, {
      number: 4,
      active: false,
      label: '5'
    }];
    expect(getPages(meta)).toEqual(result);
  });

  it('should getPages when the offset is 40', () => {
    const meta = getMetaMock({
      limit: 20,
      next: '',
      offset: 40,
      previous: '',
      total_count: 407
    });
    const result = [{
      number: 0,
      active: false,
      label: '1'
    }, {
      number: 1,
      active: false,
      label: '2'
    }, {
      number: 2,
      active: true,
      label: '3'
    }, {
      number: 3,
      active: false,
      label: '4'
    }, {
      number: 4,
      active: false,
      label: '5'
    }, {
      number: 5,
      active: false,
      label: '6'
    }];
    expect(getPages(meta)).toEqual(result);
  });

  it('should getPages when the offset is 400', () => {
    const meta = getMetaMock({
      limit: 20,
      next: '',
      offset: 400,
      previous: '',
      total_count: 407
    });
    const result = [{
      number: 17,
      active: false,
      label: '18'
    }, {
      number: 18,
      active: false,
      label: '19'
    }, {
      number: 19,
      active: false,
      label: '20'
    }, {
      number: 20,
      active: true,
      label: '21'
    }];
    expect(getPages(meta)).toEqual(result);
  });
});
