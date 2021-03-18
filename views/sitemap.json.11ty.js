module.exports = function (data) {
  const result = data.collections.post.map((post) => {
    const slug = post.template.fileSlugStr;
    const title = post.template.frontMatter.data.title;
    const date = post.date;

    // clean content
    let content = post.template.inputContent.replace(
      /---[\s\S]*?---/,
      "# " + title
    );
    content = content.replace(/(!\[.*?\]\(\.)(.+?)(\))/g, (whole, a, b, c) => {
      a = a.replace(".", "");
      b = "https://nueleanu.com/posts/" + slug + b;
      return a + b + c;
    });

    return { title, date, slug, content };
  });

  return JSON.stringify(result, null, 4);
};
