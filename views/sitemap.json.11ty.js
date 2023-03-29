module.exports = function (data) {
  const result = data.collections.post
    .filter((post) => post.template.fileSlugStr != "uses")
    .map((post) => {
      console.log(post.template);
      const slug = post.template.filePathStem;
      const title = post.template.frontMatter.data.title;
      const date = post.date;
      const postUrl = "https://dotmethod.me" + slug;
      const header = `# ${title}\n\n_Originally posted on [dotmethod.me](${postUrl})_\n\n`;

      // clean content
      let content = post.template.inputContent.replace(
        /---[\s\S]*?---/,
        header
      );
      content = content.replace(
        /(!\[.*?\]\(\.)(.+?)(\))/g,
        (whole, a, b, c) => {
          // replace images with absolute urls
          a = a.replace(".", "");
          b = postUrl + b;
          return a + b + c;
        }
      );

      return { title, date, slug, content };
    });

  return JSON.stringify(result, null, 4);
};
