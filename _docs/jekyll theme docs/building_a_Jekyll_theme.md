---
title: Create a Jekyll Documentation Theme from an Existing HTML Template
permalink: building-a-jekyll-theme.html
sidebar: themeinstructions
product: Theme instructions
---

## Introduction

- theming a jekyll site is a lot easier than creating a WP site
- start with an existing html framework, add a few jekyll tags, and you’re off

## Choose an HTML template
bootply is good. lots of responsive themes. just find some html that you think will work well.
[http://www.codeply.com/go/rV7KhUjwCN]

save this file as default.html in your project folder folder. make sure it loads and works well.

## Add configuration file

add _config.yml file with some boilerplate code_
no need for bundle init right now. not using any gems, and want to keep it this way to maximize compatibilty

## Create a default layout
create _layout folder_
put default.html into this folder
put frontmatter tags in default.html
add variables for site.title, site.description, page.title

in config file:


highlighter: rouge

markdown: kramdown
kramdown:
 input: GFM
 auto_ids: true
 hard_wrap: false
 syntax_highlighter: rouge


defaults:
  -
    scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
      comments: true
      search: true
      sidebar: home
  -
    scope:
      path: ""
      type: "pages"
    values:
      layout: "page"
      sidebar: home

## Create an index page
Create index.md file

---
title: Homepage
permalink: index.html
---


put frontmatter tags in there. this is a signpost that jekyll will start process the file
title

permalink to think about how you want pages rendered. this is a doc site, so i want all links flattened in the root so that my site can be viewed offline

## Define where that content appears in your default layout

add content tags into default where it makes sense for the content to appear
customize the h1 tags with the title

---
title: Homepage
permalink: index.html
---

This is some content.

Now build the site with jekyll serve.

make sure you have Ruby and RubyGems installed.
Then use this:

gem install jekyll bundler

not going to use bundler now

jekyll serve. you should see your content populated.

Create another page and make sure that also gets populated.

## Customize the navigation

look in your html for the list items that are defined. we'll store this information in a yaml format and loop through it. there are varying levels of sophistication for the sidebar. see my yaml tutorial.

you can also just loop through all pages. put a tag or something in your pages and then use a for loop to iterate through them.

add _data file. store some stuff there.

## set up syntax highlighting
- syntax.css
