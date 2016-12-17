---
title: Tags
permalink: tags.html
sidebar: themeinstructions
---

Whereas the sidebar provides navigation within the same product, tags provide navigation across all the products on your site. Each tag has a corresponding page (unlike the sidebar, which gets built into each page). Additionally, tags are supported within the translation strategy. There's a collection for tags, with different tag collections by language.

For example, here's the tag collection for Japanese content:

```yaml
collections:
  tags_ja:
    output: true
```

The tag docs are contained in \_tag, \_tag_ja, and \_tag_de.

The `defaults` in the config file specifies the `tag_group` property:

```
defaults:
    scope:
      path: ""
      type: docs_ja
    values:
      tag_group: taglist_ja
```

This `tag_group` property then gets passed to tags.html, which is included in the `default` layout:

```
{% raw %}{% for tag in page.tags %}
{% assign doctags = site.data[page.tag_group] %}{% endraw %}
```

The `tag_group` value then specifies either taglist.yml, taglist_ja.yml, or taglist_de.yml from the \_data folder.

The tags.html code looks at the `tags` specified for the page, loops through the taglist data file for a match, and if it finds a match, includes the tag on the page. The tag is linked to a tag doc that gathers all other docs that also contain that same tag.

These tag pages are contained in _tags, _tags_ja, and _tags_de. Their logic is re-purposed from the same include stored in taglogic.html. The taglogic file looks through the collection to find all docs that contain the tag, and then lists them in a table.
