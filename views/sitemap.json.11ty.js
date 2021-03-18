module.exports = function (data) {
  const result = data.collections.post.map((post) => {
    const content = post.template.inputContent.replace(/---[\s\S]*?---/, "");

    return {
      title: post.template.frontMatter.data.title,
      date: post.date,
      slug: post.template.fileSlugStr,
      content,
    };
  });

  return JSON.stringify(result, null, 4);
};
