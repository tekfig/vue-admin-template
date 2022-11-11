import { add, result, list, trigger } from '@/api/task'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // add task
  add({ commit }, taskInfo) {
    const { name, language, file } = taskInfo
    return new Promise((resolve, reject) => {
      const forms = new FormData()
      forms.append('taskName', name.trim())
      forms.append('language', language)
      forms.append('file', file)
      add(forms).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please check input information.')
        }
        // commit(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
