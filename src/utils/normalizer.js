export default class Normalizer {
  constructor (options = {}) {
    Object.keys(options).forEach(key => {
      this[key] = options[key]
    })
  }

  key (item) {
    return item.id
  }

  value (item) {
    return item
  }

  normalize (items = []) {
    if (!Array.isArray(items)) {
      items = [items]
    }
    const result = []
    const entities = {}
    items.forEach(item => {
      const key = this.key(item)
      result.push(key)
      entities[key] = this.value(item)
    })
    return {
      result,
      entities
    }
  }
}
