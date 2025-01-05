module.exports = async function (data) {
  const result = await Promise.all(
    data.collections.post
      .filter((post) => post.template.fileSlugStr != "uses")
      .map(async (post) => {
        const slug = post.template.filePathStem;
        const dataCache = await post.template._dataCache;
        const title = await dataCache.title;
        const date = post.date;
        const postUrl = "https://dotmethod.me" + slug;
        const header = `# ${title}\n\n_Originally posted on [dotmethod.me](${postUrl})_\n\n`;

        // clean content
        let content = await post?.template?.inputContent;
        content = content?.replace(/---[\s\S]*?---/, header);
        content = content?.replace(
          /(!\[.*?\]\(\.)(.+?)(\))/g,
          (whole, a, b, c) => {
            // replace images with absolute urls
            a = a.replace(".", "");
            b = postUrl + b;
            return a + b + c;
          }
        );

        return { title, date, slug, content };
      })
  );

  return JSON.stringify(result, null, 4);
};
