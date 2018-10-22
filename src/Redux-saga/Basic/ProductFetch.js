import { takeEvery, call, put } from 'redux-saga/effects';
import Api from './path/to/api';

function fetchProductsApi() {
  return Api.fetch('/products')
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function* fetchProducts() {
  const { response, error } = yield call(fetchProductsApi);
  if (response)
    yield put({ type: 'PRODUCTS_RECEIVED', products: response });
  else
    yield put({ type: 'PRODUCTS_REQUEST_FAILED', error });
}

function* watchFetchProducts() {
  yield takeEvery('PRODUCTS_REQUESTED', fetchProducts);
}
