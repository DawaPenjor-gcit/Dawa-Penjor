/**
 * Utility helpers for Dzongkha script and numeral conversion
 */

const WESTERN_TO_DZONGKHA_DIGITS: Record<string, string> = {
  '0': '༠',
  '1': '༡',
  '2': '༢',
  '3': '༣',
  '4': '༤',
  '5': '༥',
  '6': '༦',
  '7': '༧',
  '8': '༨',
  '9': '༩',
};

const DZONGKHA_TO_WESTERN_DIGITS: Record<string, string> = {
  '༠': '0',
  '༡': '1',
  '༢': '2',
  '༣': '3',
  '༤': '4',
  '༥': '5',
  '༦': '6',
  '༧': '7',
  '༨': '8',
  '༩': '9',
};

/**
 * Converts Western digits in a string to Dzongkha numerals
 */
export function toDzongkhaDigits(input: string): string {
  return input.replace(/[0-9]/g, (digit) => WESTERN_TO_DZONGKHA_DIGITS[digit] || digit);
}

/**
 * Converts Dzongkha numerals in a string to Western digits
 */
export function toWesternDigits(input: string): string {
  return input.replace(/[༠-༩]/g, (digit) => DZONGKHA_TO_WESTERN_DIGITS[digit] || digit);
}

/**
 * Checks if a string contains any Dzongkha numerals
 */
export function hasDzongkhaDigits(input: string): boolean {
  return /[༠-༩]/.test(input);
}

/**
 * Common Dzongkha keyboard symbols for easy click-to-insert
 */
export const DZONGKHA_QUICK_SYMBOLS = [
  { char: '་', name: 'Tsheg (Word divider)' },
  { char: '།', name: 'Shad (Sentence end)' },
  { char: '༎', name: 'Nyis-Shad (Section end)' },
  { char: '༡', name: '1' },
  { char: '༢', name: '2' },
  { char: '༣', name: '3' },
  { char: '༤', name: '4' },
  { char: '༥', name: '5' },
  { char: '༦', name: '6' },
  { char: '༧', name: '7' },
  { char: '༨', name: '8' },
  { char: '༩', name: '9' },
  { char: '༠', name: '0' },
  { char: '/', name: 'Slash' },
];
