import Bmob from '../utils/Bmob'
import {
  ADD_MATERIALS,
  GET_MATERIALS_BY_ID,
  GET_MATERIALS_BY_TYPE,
  GET_TOP_MATERIALS
} from '../constants'

// const query = Bmob.Query('materials')
export const addMaterial = () => {
  return {
    type: ADD_MATERIALS
  }
}

export const getMaterialsById = id => {
  const query = Bmob.Query('materials')
  return dispatch => {
    query.equalTo('package_id', '==', id)
    query.find().then(res => {
      dispatch({
        type: GET_MATERIALS_BY_ID,
        materials: res
      })
    })
  }
}

export const getMaterialsByType = params => {
  const { id, type } = params
  const query = Bmob.Query('materials')
  return dispatch => {
    query.equalTo('package_id', '==', id)
    query.equalTo('type', '==', type)
    query.order('-number')
    query.limit(3)
    query.find().then(res => {
      dispatch({
        type: GET_MATERIALS_BY_TYPE,
        materials: res
      })
    })
  }
}

export const getTopMaterials = params => {
  const { types, pid } = params
  const query = Bmob.Query('materials')
  return dispatch => {
    query.equalTo('package_id', '==', pid)
    query.limit(3)
    // const query1 = query.equalTo('type', '==', 'steel')
    // const query2 = query.equalTo('type', '==', 'cement')
    const querys = types.map(type => query.equalTo('type', '==', type))
    // query.or(query1, query2)
    query.or(...querys)
    query.find().then(res => {
      dispatch({
        type: GET_TOP_MATERIALS,
        topMaterials: res
      })
    })
  }
}