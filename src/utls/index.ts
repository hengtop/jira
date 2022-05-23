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
