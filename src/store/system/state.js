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
const group = {
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

const role = {
  lists: {
    records: [],
    current: 1,
    total: 0,
    pages: 0,
    path: ''
  }
}

const policy = {
  lists: {
    records: [],
    current: 1,
    total: 0,
    pages: 0,
    path: ''
  }
}
const application = {
  lists: {
    records: [],
    current: 1,
    total: 0,
    pages: 0,
    path: ''
  }
}

export default function () {
  return {
    user,
    group,
    role,
    policy,
    application
  }
}
