export const getBookletList = () => {
  return new Promise((resolve, reject) => {
    fetch(
      'https://api.juejin.cn/booklet_api/v1/booklet/bookletshelflist?aid=2608&uuid=7425557334146385434&spider=0',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({}),
      }
    )
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
