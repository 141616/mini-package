import { ADD, MINUS } from '../constants'

export const add = () => {
  return {
    type: ADD
  }
}

export const minus = () => {
  return {
    type: MINUS
  }
}

export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}
