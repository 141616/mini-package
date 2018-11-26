import Bmob from '../utils/Bmob'
import { ADD_MATERIALS, GET_MATERIALS_BY_ID } from '../constants'

const query = Bmob.Query('materials')
export const addMaterial = () => {
  return {
    type: ADD_MATERIALS
  }
}
export const getMaterialsById = id => {
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