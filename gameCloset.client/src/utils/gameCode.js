export function gameCode() {
  let timestamp = (new Date().getTime() / 1000 | 0).toString(5);
  return timestamp + 'xxxxx'.replace(/[x]/g, () => (
    Math.random() * 5 | 0).toString(5)).toLowerCase();
}
// TODO integrate this with game night