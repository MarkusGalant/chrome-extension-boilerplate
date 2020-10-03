export const wait = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const convertToCSV = (array: IParseItem[]) => {
  return array
    .map((it) => {
      return `${it.title},\"${it.channel}\",${it.link}`;
    })
    .join('\r\n');
};
