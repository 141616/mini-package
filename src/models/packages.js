export default {
  state: {
    items: [],
    total: 0
  },
  reducers: {
    create: (state, actions) => {
      let { items, total } = state
      items.push(actions.package)
      return {
        items,
        total: total + 1
      }
    }
  },
  effects: {
    async createAsync(payload) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.create(payload)
    }
  }
}