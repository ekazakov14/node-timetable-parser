export function parseType(string) {
  const reg = string.match(/[а-яё]+/i);
  return reg ? reg[0] : string;
}

export function parseWeeks(string) {
  const reg = string.match(/\d+/g);
  return reg ? reg[0] : string;
}

export function parseRoom(string) {
  const reg = string.match(/^ауд.: (.*)/);
  return reg ? reg[1] : string;
}