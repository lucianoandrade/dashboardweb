type SecondToTimePattners = 'HH:mm' | 'mm:ss' | 'HH:mm:ss';

function format(str: string) {
  return `${str.length === 1 ? `0${str}` : str}`;
}

/**
 * Está função recebe os segundos e retorna de uma fomar legível
 * em hh:mm:ss
 */
export default (
  seconds: number,
  pattner: SecondToTimePattners = 'HH:mm:ss'
): string => {
  const sec = (seconds % 60).toFixed(0);
  const min = ((seconds / 60) % 60).toFixed(0);
  const hour = (seconds / 60 / 60).toFixed(0);
  return `${format(hour)}:${format(min)}:${format(sec)}`;

  // Legado... RETIRAR NA PROXIMA ALTERAÇÃO
  // switch (pattner) {
  //   case 'HH:mm:ss':
  //     return `${format(hour)}:${format(min)}:${format(sec)}`;
  //   case 'mm:ss':
  //     return `${format((seconds / 60).toFixed(0))}:${format(sec)}`;
  //   default:
  //     return `${format(hour)}:${format(min)}`;
  // }
};
