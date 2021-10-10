const user = {
  lists: {
    records: [],
    current: 1,
    total: 0,
    pages: 0,
    path: ''
  },
  item: {
    data: {},
    path: ''
  }
}

export default function () {
  return {
    user
  }
}
