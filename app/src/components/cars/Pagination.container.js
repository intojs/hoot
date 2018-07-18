// @flow
import React, {Component} from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

import type {AppState} from "../../domain/AppState";
import type {Page} from "../../domain/Page";
import {store} from '../../store/store';
import {getLimit, getNextOffset, getPages, getPrevOffset, isFirstPage, isLastPage} from "../../domain/Meta.service";
import {getMeta} from "../../domain/AppState.service";
import {getCarsEffect} from "../../store/car.effects";

type Props = {};

type State = {
  pages: Page[];
  first: boolean;
  last: boolean;
}

export class PaginationContainer extends Component<Props, State> {
  subscriber: Function;
  state: State = {
    pages: [],
    first: false,
    last: false
  };

  constructor(props: Props) {
    super(props);

    this.subscriber = store.subscribe((appState: AppState) => {
      const meta = getMeta(appState);
      let pages = getPages(meta);
      this.setState({
        pages,
        first: isFirstPage(meta),
        last: isLastPage(meta)
      });
    });
  }

  getPage(page: Page) {
    const state = store.getState();
    const meta = getMeta(state);
    const limit = getLimit(meta);
    const offset = page.number * limit;
    getCarsEffect(offset, limit);
  }

  getPrevPage() {
    const state = store.getState();
    const meta = getMeta(state);
    getCarsEffect(getPrevOffset(meta), getLimit(meta));
  }

  getNextPage() {
    const state = store.getState();
    const meta = getMeta(state);
    getCarsEffect(getNextOffset(meta), getLimit(meta));
  }

  render() {
    return (
      <Pagination>
        {
          !this.state.first &&
          <PaginationItem>
            <PaginationLink
              previous
              onClick={() => this.getPrevPage()}
            />
          </PaginationItem>
        }
        {
          this.state.pages.map((page: Page, index) => {
            return (
              <PaginationItem
                active={page.active}
                key={index}
              >
                <PaginationLink
                  onClick={() => this.getPage(page)}
                >
                  {page.label}
                </PaginationLink>
              </PaginationItem>
            )
          })
        }
        {
          !this.state.last &&
          <PaginationItem>
            <PaginationLink
              next
              onClick={() => this.getNextPage()}
            />
          </PaginationItem>
        }
      </Pagination>
    );
  }

  componentWillUnmount() {
    store.unsubscribe(this.subscriber);
  }
}
