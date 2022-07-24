export const lerp = (p1: number, p2: number, t: number) => {
  return p1 + (p2 - p1) * t;
};

export const easeInOut = (t: number) => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};
