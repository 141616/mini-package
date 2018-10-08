import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import { ADD, MINUS } from '../constants'

export default createReducer(fromJS({
  num: 0
}), {
  [ADD]: state => {
    const counterState = state.toJS()
    return state.merge({
      num: counterState.num + 1
    })
  },
  [MINUS]: state => {
    const counterState = state.toJS()
    return state.merge({
      num: counterState.num - 1
    })
  }
})

// export default function counter (state = INITIAL_STATE, action) {
//   switch (action.type) {
//     case ADD:
//       return {
//         ...state,
//         num: state.num + 1
//       }
//     case MINUS:
//       return {
//         ...state,
//         num: state.num - 1
//       }
//     default:
//       return state
//   }
// }