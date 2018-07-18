// @flow
import type {Meta} from "./Meta";
import type {Page} from "../Page";
import {createPage} from "../Page.service";

export const getTotalPageNumber = ({total_count, limit}: Meta): number =>
  total_count ?
    Math.floor(total_count / limit) :
    0;

export const getCurrentPageNumber = ({offset, limit}: Meta): number => offset / limit;

export const isFirstPage = (meta: Meta): boolean => meta.offset === 0;

export const isLastPage = (meta: Meta): boolean =>
  meta.total_count ?
    meta.offset + meta.limit >= meta.total_count :
    false;

export const getPrevOffset = (meta: Meta): number => meta.offset - meta.limit;

export const getNextOffset = (meta: Meta): number => meta.offset + meta.limit;

export const getLimit = (meta: Meta): number => meta.limit;

export const getNext3 = (current: number, last: number, result: number[]) => {
  if (result.length < 3 && (current + 1) <= last) {
    result.push(current + 1);
    getNext3(current + 1, last, result);
  }
  return result;
};

export const getPrev3 = (current: number, result: number[]): number[] => {
  if (result.length < 3 && (current - 1) >= 0) {
    result.unshift(current - 1);
    getPrev3(current - 1, result);
  }
  return result;
};

export const getPages = (meta: Meta): Page[] => {
  const totalPageNumber = getTotalPageNumber(meta);
  const currentPageNumber = getCurrentPageNumber(meta);
  return [
    ...getPrev3(currentPageNumber, []),
    currentPageNumber,
    ...getNext3(currentPageNumber, totalPageNumber, [])
  ]
    .map((nr: number) => createPage({
      number: nr,
      label: (nr + 1).toString(),
      active: currentPageNumber === nr
    }));
};
