import { GET_PACKAGES_LIST, GET_PACKAGE_BY_ID, CREATE_PACKAGE } from '../constants'
import Bmob from '../utils/Bmob'

const query = Bmob.Query('packages')

export const createPackage = () => {
  return {
    type: CREATE_PACKAGE
  }
}

export const getPackageById = () => {
  return {
    type: GET_PACKAGE_BY_ID
  }
}

export const getPackageList = () => {
  return dispatch => {
    query.find().then(res => {
      dispatch({
        type: GET_PACKAGES_LIST,
        packages: res
      })
    }).catch(() => {
      dispatch({
        type: GET_PACKAGES_LIST,
        packages: []
      })
    })
  }
}