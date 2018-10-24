import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import { GET_PACKAGES_LIST, CREATE_PACKAGE } from '../constants'

export default createReducer(fromJS({
  packages: []
}), {
  [GET_PACKAGES_LIST]: (state, actions) => {
    const { packages } = actions
    return state.merge({
      packages
    })
  },
  [CREATE_PACKAGE]: (state, actions) => {
    const packagesState = state.toJS()
    packagesState.packages.push(actions.package)
    return state.merge({
      packages: packagesState.packages
    })
  }
})