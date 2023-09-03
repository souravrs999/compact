export function generateFallbackString(inputString: string) {
  if (!inputString) {
    return "";
  }

  const words = inputString.split(/\s+/);
  if (words.length < 2) {
    return words[0].charAt(0);
  }

  const firstCharacter1 = words[0].charAt(0);
  const firstCharacter2 = words[1].charAt(0);

  return firstCharacter1 + firstCharacter2;
}
