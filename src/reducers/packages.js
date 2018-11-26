import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import { GET_PACKAGES_LIST, CREATE_PACKAGE } from '../constants'
import Normalizer from '../utils/normalizer'

const normalizer = new Normalizer({
  key (item) {
    return item.objectId
  }
})

export default createReducer(fromJS({
  packages: [],
  __packages: {}
}), {
  [GET_PACKAGES_LIST]: (state, actions) => {
    const { packages } = actions
    const { result, entities } = normalizer.normalize(packages)
    return state.merge({
      packages,
      __packages: { result, entities }
    })
  },
  [CREATE_PACKAGE]: (state, actions) => {
    const packagesState = state.toJS()
    packagesState.packages.push(actions.package)
    return state.merge({
      packages: packagesState.packages,
      __packages: normalizer.normalize(packagesState.packages)
    })
  }
})