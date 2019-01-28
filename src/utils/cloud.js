const db = wx.cloud.database()
const packages = db.collection('packages')

export default {
  packages
}