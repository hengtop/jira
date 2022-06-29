export const cleanObject = (object: { [key: string]: unknown }) => {
  // 这里修改了传入参数的类型，保证传入的类型为函数导致解构出来为空对象
  const result = { ...object };
  const keys = Object.keys(object);
  if (keys.length === 0) return result;
  Object.keys(object).forEach((key) => {
    // @ts-ignore
    const value = object[key];
    if (value === undefined || value === null || value === "") {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const debounce = (
  fn: (...args: any[]) => void,
  delay: number,
  immediate = false,
) => {
  let time: NodeJS.Timeout | null = null;
  let isInvoke = false;
  return (...args: any[]) => {
    if (time) {
      clearTimeout(time); //多次点击就会清除上一个定时器，所以始终按照最后一次的点击时间开始执行
      time = null;
    }

    if (immediate && !isInvoke) {
      fn.apply(this, args);
      return (isInvoke = true);
    }
    time = setTimeout(() => {
      fn.apply(this, args);
      isInvoke = false;
    }, delay);
  };
};
