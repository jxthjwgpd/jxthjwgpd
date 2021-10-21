export const receiveUserList = (state, { records, path, current, total, pages }) => {
  state.user.lists = {
    records,
    current,
    total,
    pages,
    path
  }
}
export const receiveGroupList = (state, { records, path, current, total, pages }) => {
  state.group.lists = {
    records,
    current,
    total,
    pages,
    path
  }
}
export const receiveRoleList = (state, { records, path, current, total, pages }) => {
  state.role.lists = {
    records,
    current,
    total,
    pages,
    path
  }
}
export const receivePolicyList = (state, { records, path, current, total, pages }) => {
  state.policy.lists = {
    records,
    current,
    total,
    pages,
    path
  }
}
export const receiveApplicationList = (state, { records, path, current, total, pages }) => {
  state.application.lists = {
    records,
    current,
    total,
    pages,
    path
  }
}
