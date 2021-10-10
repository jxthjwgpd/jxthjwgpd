export const receiveUserList = (state, { records, path, current, total, pages }) => {
  state.user.lists = {
    records,
    current,
    total,
    pages,
    path
  }
}
