const save = (key: string, data: number[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

const get = (key: string): number[] => {
  const arrayId = JSON.parse(localStorage.getItem(key) as string);
  if (!arrayId) {
    return arrayId;
  }
  console.log(arrayId);
  return arrayId.map((item: string) => +item);
};

export { save, get };
