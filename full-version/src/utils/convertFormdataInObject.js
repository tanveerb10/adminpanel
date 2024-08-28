export const convertFormdataInObject = (data, type) => {
  if (!data || !(data instanceof FormData)) {
    throw new Error('Invalid input: Expected FormData');
  }
  //   if (!data) return
  const convert = Object.fromEntries(data)
  if (type==='image') {
    const holdconvert = Object.keys(convert)
      .filter(key => !key.endsWith('_src'))
      .reduce((acc, key) => {
        acc[key] = convert[key]
        return acc
      }, {})
      return holdconvert
    } else if (type ==='file') {
      return {}
    }
}
