/**
 * Получает часовой пояс числом от -12 до 12, преобразует его для дальнейшей подстановки в
 * toLocaleDateString и toLocaleTimeString
 *
 * @param {timezone} string
 * @returns  возвращает строчку вида +03, -07, или UTC, если
 * часовой пояс 0
 * */
export const getTimezone = (timezone) => {
  if (timezone === 0) return 'UTC'
  const suffix = timezone < 0 ? '-' : '+'
  const abs = Math.abs(timezone)

  const timeZoneRedact = abs < 10 ? '0' + abs : abs

  return suffix + timeZoneRedact
}
