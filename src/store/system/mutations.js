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
