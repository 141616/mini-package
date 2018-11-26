import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import { GET_MATERIALS_BY_ID } from '../constants'
import Normalizer from '../utils/normalizer'

const normalizer = new Normalizer({
  key (item) {
    return item.objectId
  }
})

export default createReducer(fromJS({
  materials: [],
  __materials: {}
}), {
  [GET_MATERIALS_BY_ID]: (state, action) => {
    const { materials } = action
    const { result, entities } = normalizer.normalize(materials)
    return state.merge({
      materials: action.materials,
      __materials: { result, entities }
    })
  }
})