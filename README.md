# react-preloadr

A React preloader component, for displaying an indicator while performing asynchronous tasks. It
includes the `<Preloadr />` component, a simple redux reducer and a simple action creator for the
redux reducer.

## Installation

react-preloadr can be installed via **npm**:

```sh
$ npm i -S react-preloadr
```

## Usage

To use `react-preloadr` you need to pass three rendered components and a status to it and it will
render the applicable component for you. For convenience a redux reducer and action creator is
included.

### Action creators

To build your own action creators you can make use of the three statuses and the action creator
factory provided by `react-preloadr`, we are using `redux-thunk` in this example for our
asynchronous loading:

_/reducers/products/actions.js:_

```js
import { action } from 'react-preloadr';

import fetchProducts from 'api/products';

export const PRODUCTS_FAILED = 'PRODUCTS_FAILED';
export const PRODUCTS_REQUESTED = 'PRODUCTS_REQUESTED';
export const PRODUCTS_SUCCEEDED = 'PRODUCTS_SUCCEEDED';

export const productsFailed = action(PRODUCTS_FAILED);
export const productsRequested = action(PRODUCTS_REQUESTED);
export const productsSucceeded = action(PRODUCTS_SUCCEEDED);

export const productsRequestedAsync = () => (dispatch) => {
  dispatch(productsRequested());
  fetchProducts()
    .then(payload => dispatch(productsSucceeded(payload)))
    .catch(error => dispatch(productsFailed(error)));
};
```

### Reducer

To build a status driven reducer, you can either roll your own (by using the three statuses exposed
by `react-preloadr`, namely `PRELOAD_STATUS_FAILED`, `PRELOAD_STATUS_REQUESTED` and
`PRELOAD_STATUS_SUCCEEDED`) or you can use the convenient reducer factory provided:

_/reducers/products/reducer.js_

```js
import { reducer } from 'react-preloadr';

import { PRODUCTS_FAILED, PRODUCTS_REQUESTED, PRODUCTS_SUCCEEDED } from './actions'

export default reducer(PRODUCTS_FAILED, PRODUCTS_REQUESTED, PRODUCTS_SUCCEEDED);
```

And then combine this reducer into your application reducer:

_/reducers/index.js_

```js
import { combineReducers } from 'redux';
import products from './products/reducer';

export default combineReducers({ products });
```

### Component

After your reducer has been set up you can connect your component to the redux store to pull out the
status and payload and pass it to `<Preloadr />`:

```js
import PropTypes from 'prop-types';
import React from 'react';
import Preloadr, { preloadDefaultProp, preloadPropTypes } from 'react-preloadr';

import { productsRequestedAsync } from 'reducers/products/actions';

const Failed = () => <p>Failed to load products</p>;
const Requested = () => <p>Loading products</p>;
const Products = ({ payload }) => (
  <ul>{payload.map(product => <li key={product.id}>{product.name}</li>)}</ul>
);

class ProductsLoader extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    return (
      <Preloadr failed={() => <Failed />} requested={() => <Requested />} status={status}>
        {() => <Products payload={payload} />}
      </Preloadr>
    );
  }
}

ProductsLoader.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.shape()),
  status: preloadDefaultProps,
};

ProductsLoader.defaultProps = {
  payload: [],
  status: preloadDefaultProp,
};

const mapStateToProps = state => state.products;
const mapDispatchToProps = dispatch => ({ fetchProducts: dispatch(productsRequestedAsync()) });

export default connect(mapStateToProps, mapDispatchToProps)(ProductsLoader);
```
