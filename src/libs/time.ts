export const time = (date: Date) => {
  const hour = date.getHours()
  const minute = date.getMinutes()

  const paddedMinute = minute < 10 ? `0${minute}` : `${minute}`

  return `${hour}:${paddedMinute}`
}
