import { GET_PACKAGES_LIST, GET_PACKAGE_BY_ID, CREATE_PACKAGE } from '../constants'
import Bmob from '../utils/Bmob'

const query = Bmob.Query('packages')

export const createPackage = params => {
  return dispatch => {
    Object.keys(params).map(key => {
      query.set(key, params[key])
    })
    query.save().then(res => {
      dispatch({
        type: CREATE_PACKAGE,
        package: {
          ...res,
          ...params
        }
      })
    }).catch(err => {
      console.log(err)
    })
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