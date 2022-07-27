// 搜索高亮组件

export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) {
    return <>{name}</>;
  } else {
    const arr = name.split(keyword);
    return (
      <>
        {arr.map((str, index) => (
          <span key={index}>
            {str}
            {index === arr.length - 1 ? null : (
              <span style={{ color: "red" }}>{keyword}</span>
            )}
          </span>
        ))}
      </>
    );
  }
};
