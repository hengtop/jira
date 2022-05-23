export const cleanObject = (object: any) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (value === undefined || value === null || value === "") {
      console.log(value);
      delete result[key];
    }
  });
  return result;
};

export const debounce = (fn: any, delay: number, immediate = false) => {
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
