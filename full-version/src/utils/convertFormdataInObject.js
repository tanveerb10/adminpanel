export const convertFormdataInObject = data => {
  //   if (!data) return
  const convert = Object.fromEntries(data)
  const holdconvert = Object.keys(convert)
    .filter(key => !key.endsWith('_src'))
    .reduce((acc, key) => {
      acc[key] = convert[key]
      return acc
    }, {})
  return holdconvert
}
