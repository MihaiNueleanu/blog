const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const { DateTime } = require("luxon");
const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("absoluteUrl", (rel) => {
    return `https://nueleanu.com${rel}`;
  });

  eleventyConfig.addPassthroughCopy({ "public/css": "css" });
  eleventyConfig.addPassthroughCopy({ "public/images": "images" });
  eleventyConfig.addPassthroughCopy({ "public/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "public/js": "js" });
  // eleventyConfig.addPassthroughCopy("posts/**/*.png");

  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    templateFormats: ["md", "njk", "html", "liquid", "png", "jpg", "jpeg"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    dir: {
      input: "views",
      includes: "./_includes",
      data: "./_data",
      output: "_site",
    },
  };
};
