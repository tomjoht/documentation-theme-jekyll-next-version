---
title: How translation works
permalink: translation.html
sidebar: themeinstructions
---

Some assumptions:

* Permalinks (URLs) for the pages remain the same (and aren't translated).
* Links in page content remain the same across languages.


The "page" or "post" content types aren't used. Documentation content is stored in collections. Each language has its own collection:

* **\_docs**: English
* **\_docs_ja**: Japanese
* **\_docs_de**: German

There are also 3 config files:

* \_config.yml: English
* \_config_ja.yml: Japanese
* \_config_de.yml: German

Each config file declares the collection for that language. Here's the English \_config.yml file:

```yaml
collections:
  docs:
    output: true
```

And the Japanese \_config_ja.yml file:

```yaml
collections:
  docs_ja:
    output: true
```

And the German \_config_de.yml file:

```
collections:
  docs_de:
    output: true
```

Depending on the configuration file you use, the site will include only that collection. This way Japanese builds won't contain English or German docs, nor will German builds contain Japanese or English docs.

This also ensures that a permalink in an English doc won't conflict with the same permalink in a German or Japanese doc.

The sidebar and topnav should also switch to the right language as well. These sidebar receives it configuration from the page front matter.

```
---
title: Sample 1
permalink: sample1.html
sidebar: generic
---
```

The `sidebar` value then gets passed into sidebar.html include, which is included in the default layout:

```
{% raw %}{% assign sidebar = site.data[page.sidebar] %}

<div class="productTitle">{{sidebar.sidebarTitle}}</div>
<ul id="docnavsidebar" class="docnav">
    {% for folder in sidebar.folders %}{% endraw %}
    ...
```

The value for `topnav` is likewise passed into the `default` layout:

```
{% raw %}{% assign topnav = site.data[page.topnav] %}
{% for entry in topnav.navbar_singleitems %}{% endraw %}
```

However, rather than specifying the `topnav` value in each page's frontmatter, as is done with `sidebar`, this value is set as a `default` in the config file for that language. This is because the topnav is the same for all docs in that collection, but each collection can have multiple sidebars.

Here's the config `defaults` for English:

```yaml
    defaults:
      -
        scope:
          path: ""
          type: docs
        values:
          layout: default
          topnav: topnav
```

And for Japanese:

```yaml
defaults:

  -
    scope:
      path: ""
      type: docs_ja
    values:
      layout: default
      topnav: topnav_ja
```

And for German:

```yaml
defaults:

  -
    scope:
      path: ""
      type: docs_de
    values:
      layout: default
      topnav: topnav_de
```

UI strings also change based on the config file. Here are the UI strings for English:

```yaml
uistring:
    title: Jekyll Documentation theme # Displays as site title on top nav bar and on site metadata
    description: Documentation theme for Jekyll websites  # Displays as site description meta
    search_placeholder: Search ...
    minitoc_title: Table of Contents
    github_edit_button_text: Edit me
    tag_terms:
      product: Product
      page: Page
      excerpt: Excerpt
      tag_page_intro: The following pages are tagged with
```

The config files for Japanese and German look the same but with different translations.

Tags are also translated. Since tags are more complex, they're explained in [Tags](tags.html).
