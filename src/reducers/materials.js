import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import {
  GET_MATERIALS_BY_ID,
  GET_MATERIALS_BY_TYPE,
  GET_TOP_MATERIALS
} from '../constants'
import Normalizer from '../utils/normalizer'

const normalizer = new Normalizer({
  key (item) {
    return item.objectId
  }
})

export default createReducer(fromJS({
  materials: [],
  __materials: {},
  topMaterials: []
}), {
  [GET_MATERIALS_BY_ID]: (state, action) => {
    const { materials } = action
    const { result, entities } = normalizer.normalize(materials)
    return state.merge({
      materials: action.materials,
      __materials: { result, entities }
    })
  },

  [GET_MATERIALS_BY_TYPE]: (state, action) => {
    console.log(action)
    return state
  },

  [GET_TOP_MATERIALS]: (state, action) => {
    console.log(action)
    const { topMaterials } = action
    return state.merge({
      topMaterials
    })
  }
})