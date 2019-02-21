# react-preloadr

[![Build Status](https://travis-ci.org/hvolschenk/react-preloadr.svg?branch=master)](https://travis-ci.org/hvolschenk/react-preloadr)
[![Coverage Status](https://coveralls.io/repos/github/hvolschenk/react-preloadr/badge.svg?branch=master)](https://coveralls.io/github/hvolschenk/react-preloadr?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

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

We are using `redux-thunk` in this example for our asynchronous loading:

_/reducers/products/actions.js:_

```js
import fetchProducts from 'api/products';

export const PRODUCTS_FAILED = 'PRODUCTS_FAILED';
export const PRODUCTS_REQUESTED = 'PRODUCTS_REQUESTED';
export const PRODUCTS_SUCCEEDED = 'PRODUCTS_SUCCEEDED';

export const productsFailed = payload => ({
  payload,
  type: PRODUCTS_FAILED,
});
export const productsRequested = () => ({
  type: PRODUCTS_REQUESTED,
});
export const productsSucceeded = payload => ({
  payload,
  type: PRODUCTS_SUCCEEDED,
});

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
import { reducer, PRELOAD_STATUS_REQUESTED } from 'react-preloadr';

import { PRODUCTS_FAILED, PRODUCTS_REQUESTED, PRODUCTS_SUCCEEDED } from './actions'

const optionalInitialState = {
  payload: [],
  status: PRELOAD_STATUS_REQUESTED,
};

export default reducer(PRODUCTS_FAILED, PRODUCTS_REQUESTED, PRODUCTS_SUCCEEDED, optionalInitialState);
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
const ProductsList = ({ payload }) => (
  <ul>{payload.map(product => <li key={product.id}>{product.name}</li>)}</ul>
);

class Products extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    const { payload, status } = this.props;
    return (
      <Preloadr failed={() => <Failed />} requested={() => <Requested />} status={status}>
        {() => <ProductsList payload={payload} />}
      </Preloadr>
    );
  }
}

Products.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.shape()),
  status: preloadDefaultProps,
};

Products.defaultProps = {
  payload: [],
  status: preloadDefaultProp,
};

const mapStateToProps = state => state.products;
const mapDispatchToProps = dispatch => ({ fetchProducts: dispatch(productsRequestedAsync()) });

export default connect(mapStateToProps, mapDispatchToProps)(Products);
```

## Usage without redux

This component can also be used without Redux, to do this you will have to manually set the status
as you are doing your asynchronous call.

```js
import PropTypes from 'prop-types';
import React from 'react';
import Preloadr, {
  PRELOAD_STATUS_FAILED,
  PRELOAD_STATUS_REQUESTED,
  PRELOAD_STATUS_SUCCEEDED,
} from 'react-preloadr';

import fetchProducts from 'api/products';

const Failed = () => <p>Something went wrong</p>;
const Requested = () => <p>Loading products</p>;

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: [],
      status: PRELOAD_STATUS_REQUESTED,
    };
  }
  componentDidMount() {
    fetchProducts()
      .then(payload => this.setState({ payload, status: PRELOAD_STATUS_SUCCEEDED }))
      .catch(error => this.setState({ payload: error, status: PRELOAD_STATUS_FAILED }));
  }
  render() {
    const { payload, status } = this.state;
    return (
      <Preloadr failed={() => <Failed />} requested={() => <Requested />} status={status}>
        {() => <Products payload={payload} />}
      </Preloadr>
    );
  }
}

export default Products;
```

## Multiple statii

It is also possible to send multiple statii to `<Preloadr />`. First, if any of the statii is
`PRELOAD_STATUS_REQUESTED` the `requested` component will be loaded. Secondly, if any of the statii
is `PRELOAD_STATUS_FAILED` the `failed` component will be loaded (after all
`PRELOAD_STATUS_REQUESTED` are resolved). If all statii are `PRELOAD_STATUS_SUCCEEDED` then the
`children` component will be loaded:

```js
import PropTypes from 'prop-types';
import React from 'react';
import Preloadr, { preloadDefaultProp, preloadPropTypes } from 'react-preloadr';

import { productsRequestedAsync } from 'reducers/products/actions';
import { usersRequestedAsync } from 'reducers/users/actions';

const Failed = () => <p>Failed to load products</p>;
const Requested = () => <p>Loading products</p>;
const ProductsList = ({ products, users }) => (
  <div><!-- Do something with products and users --></div>
);

class Products extends React.Component {
  componentDidMount() {
    const { fetchProducts, fetchUsers } = this.props;
  }
  render() {
    const {
      products: { payload: productsPayload, status: productsStatus },
      users: { payload: usersPayload, status: usersStatus },
    } = this.props;
    return (
      <Preloadr
        failed={() => <Failed />}
        requested={() => <Requested />}
        status={[productsStatus, usersStatus]}
      >
        {() => <ProductsList products={productsPayload} users={usersPayload} />}
      </Preloadr>
    );
  }
}

Products.propTypes = {
  products: PropTypes.shape({
    payload: PropTypes.arrayOf(PropTypes.shape()),
    status: preloadDefaultProps,
  }),
  users: PropTypes.shape({
    payload: PropTypes.arrayOf(PropTypes.shape()),
    status: preloadDefaultProps,
  }),
};

Products.defaultProps = {
  products: {
    payload: [],
    status: preloadDefaultProp,
  },
  users: {
    payload: [],
    status: preloadDefaultProp,
  },
};

const mapStateToProps = state => ({
  products: state.products,
  users: state.users,
});
const mapDispatchToProps = dispatch => ({
  fetchProducts: dispatch(productsRequestedAsync()),
  fetchUsers: dispatch(usersRequestedAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
```
