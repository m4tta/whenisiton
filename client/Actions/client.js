export function setBackground(url) {
  return {
    type: 'SET_BACKGROUND',
    backgroundUrl: url,
  }
}

export function setPageTitle(title) {
  return {
    type: 'SET_PAGETITLE',
    title: title,
  }
}
