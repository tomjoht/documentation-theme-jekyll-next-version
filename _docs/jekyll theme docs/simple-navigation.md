---
title: Building navigation
tags: [formatting]
sidebar: themeinstructions
permalink: building-navigation.html
product: Theme instructions
---

<style>
.result {
background-color: #f0f0f0;
border: 1px solid #dedede;
padding: 10px;
margin-top: 10px;
margin-bottom: 10px;
}
</style>


hey, I think you need to integrate information from this same page: http://jekyllrb.com/docs/datafiles/#the-data-folder
this is a good issues page: https://github.com/jekyll/jekyll-help/issues/266

## Introduction

Instead of hard-coding navigation links to pages, you can use Liquid logic to retrieve a list of pages. There are two primary ways of retrieving pages:

* **Retrieving pages listed in a YAML data source**. The YAML is either stored in a separate data file (in the \_data folder) or in the page's front matter (and accessed through site variables). Note that the pages don't need to be YAML only (.yaml or .yml). You could also use any files ending in .json or .csv. However, the markup-less structure in YAML makes it more readable, since the spacing drives the syntax.
* **Retrieving pages by looping through the page front matter**. You can use `for` loops to look through the site.pages or site.collections spaces to retrieve pages or documents that have particular properties in their front matter. For loops create longer build times, but sometimes this approach can be more efficient.

Note that the techniques described here for using Liquid and YAML will be brief, since you can view the full documentation for using these formats on other sites. The focus here is on building page-based navigation for a Jekyll site.

The examples that folow start with a basic navigation scenario and add more sophisticated elements to demonstrate different ways of returning the pages.

In almost every scenario, you'll see 3 elements:

* YAML
* Liquid
* Result

## Scenario 1: Basic List

You want to return a basic list of pages.

**YAML**
You have a data file named samplelist.yml in \_data.

```yaml
podcast_list_title: Favorite Podcasts
podcasts:

- title: This Week in Tech
  url: https://twit.tv/shows/this-week-in-tech

- title: Radio Lab
  url: http://www.radiolab.org/

- title: Night Vale
  url: http://www.welcometonightvale.com/
```

**Liquid**

```
<h2>{{site.data.samplelist.podcast_list_title}}</h2>
<ul>
{% raw %}{% for item in site.data.samplelist.podcasts %}
<li><a href="{{item.url}}" alt="{{item.title}}">{{item.title}}</a></li>
{% endfor %}
</ul>{% endraw %}
```

**Result**
<div class="result">
<h2>{{site.data.samplelist.podcast_list_title}}</h2>
<ul>
{% for item in site.data.samplelist.podcasts %}
<li><a href="{{item.url}}" alt="{{item.title}}">{{item.title}}</a></li>
{% endfor %}
</ul>
</div>


When you use a `for` loop, you choose the variable of what to call the things you're looping through. The variable you choose (in this case, `item`) becomes how you access the properties of each thing in the list. Dot notation is used to get each property of each thing (for example, `item.url`).

The YAML content has two main types of formats that are relevant here:

* mapping
* list

`podcast_list_title: My Favorite Podcasts` is a mapping. You access the file with `site.data.samplelist`.

`podcasts:` is a list. The list begins each item with a hyphen. Unlike with mappings, you can't access list properties directly like you can with a mapping. If you want to access a specific item in the list, you must identify get the position in the list you want, following typical array notation. For example, `site.data.samplelist.podcasts[0]` would access the first item in the list.

With lists, you usually don't access positions using the `[0]` syntax. Instead, you use `for` loops to cycle through the list of items and do something with each item. With navigation menus, you're usually insert each list item into `li` tags based on the navigation structure you're building in your HTML theme.

Each `-` indicates another item in the list. Here we list just two properties: `title` and `url`. You can list as many properties as you want for each item. The order of properties at each position in the list doesn't matter.

## Sorting the list

Suppose you wanted to sort the list by the title. To do this, convert the reference to the list to a variable, and then apply Liquid's `sort` filter to the variable:

**Liquid**

```
{% raw %}{% assign podcasts = site.data.samplelist.podcasts | sort: 'title'  %}
{% for item in podcasts %}
{{item.title}}
{% endfor %}{% endraw %}
```

**Result**
<div class="result">
{% assign podcasts = site.data.samplelist.podcasts | sort: 'title'  %}
{% for item in podcasts %}
{{item.title}}
{% endfor %}
</div>

The `sort` property in the Liquid filter applies to the title. `title` is an actual property in the list. If `title` weren't a property, this sorting method wouldn't work.

See [Liquid array filter](https://help.shopify.com/themes/liquid/filters/array-filters) for more filter options. Note that you can't simply use {% raw %} {% for item in site.data.samplelist.podcasts | sort: 'title' %} {% endraw %}. You have to convert `site.dat.samplelist.podcasts` to a variable first using either `assign` or `capture` tags.

---------


## Scenario 2: Two-level navigation list

Now let's say you want a more robust list that incorporates heading titles and subitems. To do this, add an additional level to each list item to store this information:

**YAML**

```yaml
toc:
  - title: Group 1
    subfolderitems:
      - page: Thing 1
        url: /thing1.html
      - page: Thing 2
        url: /thing2.html
      - page: Thing 3
        url: /thing3.html
  - title: Group 2
    subfolderitems:
      - page: Piece 1
        url: /piece1.html
      - page: Piece 2
        url: /piece2.html
      - page: Piece 3
        url: /piece3.html
  - title: Group 3
    subfolderitems:
      - page: Widget 1
        url: /widget1.html
      - page: Widget 2
        url: /widget2.html
      - page: Widget 3
        url: /widget3.html
```

**Liquid**

{% raw %}
<div class="result">
{% for item in site.data.samplelist.toc %}
<h3>{{item.title}}</h3>
<ul>
{% for entry in item.subfolderitems %}
<li><a href="{{entry.url}}">{{entry.page}}</a></li>
{% endfor %}
</ul>
{% endfor %}
</div>
{% endraw %}

**Result**
<div class="result">
{% for item in site.data.samplelist.toc %}
<h3>{{item.title}}</h3>
<ul>
{% for entry in item.subfolderitems %}
<li><a href="{{entry.url}}">{{entry.page}}</a></li>
{% endfor %}
</ul>
{% endfor %}
</div>

In this example, `Group 1` is the first list item. Within that list item, its subpages are included as a property that itself contains a list. The Liquid code first looks through the first level with `for item in site.data.samplelist.toc`, and then looks through the second-level property with `for entry in item.subfolderitems`. Just as `item` is arbitrary, so is `entry`.

## Access the list from a page variable

Suppose your sidebar will differ based on different documentation sets. You might have 3 different products on your site, and so you want 3 different sidebars &mdash; each being unique for that product.

You can store the name of the sidebar list in your page front matter and then pass that value into the list dynamically.

**Page front matter**

```
---
title: My page
sidebar: toc
---
```

**Liquid**

```
{% raw %}{% for item in site.data.samplelist[page.sidebar] %}
<h3>{{item.title}}</h3>
<ul>
{% for entry in item.subfolderitems %}
<li><a href="{{entry.url}}">{{entry.page}}</a></li>
{% endfor %}
</ul>
{% endfor %}{% endraw %}
```
**Result**

<div class="result">
{% for item in site.data.samplelist[page.sidebar] %}
<h3>{{item.title}}</h3>
<ul>
{% for entry in item.subfolderitems %}
<li><a href="{{entry.url}}">{{entry.page}}</a></li>
{% endfor %}
</ul>
{% endfor %}
</div>

In order to pass values from the page front matter into an assign variable, when the assigned variable isn't a string but rather a data reference, you must use brackets (instead of curly braces) to refer to the front matter's value. For more information, see [Expressions and Variables](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers#expressions-and-variables) in Liquid's documentation. Brackets are used in places where dot notation can't be used (see more details with this [Stack Overflow answer](http://stackoverflow.com/questions/4968406/javascript-property-access-dot-notation-vs-brackets/4968448#4968448).)

## Scenario: Apply active class selectively

In addition to inserting items from the YAML data file into your list, you also usually want to highlight the current link if the user is viewing that page. You do this by inserting an `active` class for items that match the current page URL.

**CSS**
```css
a.active {
  color: black;
  font-weight: bold;
  cursor: default;
}
```
**Liquid**

```

```
**Result**

<div class="result">
{% for item in site.data.samplelist[page.sidebar] %}
<h3>{{item.title}}</h3>
<ul>
{% for entry in item.subfolderitems %}
{% if page.url == "{{page.url}}" %}
   <li><a class="active" href="{{entry.url}}">{{entry.page}}</a></li>
{% else %}
   <li><a href="{{entry.url}}">{{entry.page}}</a></li>
{% endif %}
{% endfor %}
</ul>
{% endfor %}
</div>


## Scenario three: Conditional list

{% raw %}
<div class="result">
<ul>
{% for sec in site.data.samplelist.mypages %}
{% if sec.audience == "writers" %}
<li>{{sec.url}}</li>
{% endif %}
{% endfor %}
</ul>
</div>
{% endraw %}


## Scenario: Separate sidebars per page

- identify sidebar in page frontmatter, and pass that down to set which list gets used

{% assign sidebar = site.data[page.sidebar] %}



## Scenario: Robust Multi-level menu using Navgoco

- accordion, cookie, 3 level, expand/collapse

## loop through json
http://stackoverflow.com/questions/41017809/jekyll-data-people-json-arrays-reforming-and-sorting


## For loop through pages

see https://jekyllrb.com/docs/variables/. you can do for page in site.html_pages to make the looping faster.

- no access to categories variable for pages
use the uniq tag if you're getting a list of all pages that have a tag. https://help.shopify.com/themes/liquid/filters/array-filters#uniq


you cannot do this:
{% raw %}
 {% for p in site.categories.mycat %}
* <a href="{{ p.url | prepend: site.baseurl }}">{{p.title}}</a>
{% endfor %}
{% endraw %}

see http://stackoverflow.com/questions/11887929/how-do-i-loop-through-tags-in-a-jekyll-post?rq=1

basic example:

{% for page in site.pages %}
{% if page.categories contains "mycat" %}
<li><a href="{{page.url}}">{{page.title}}</a></li>
{% endif %}
{% endfor %}

 The code below dynamically generates a sidebar nav of pages with
	        `layout: page` in the front-matter. See readme for usage.

{% raw %}
		            {% assign pages_list = site.pages %}
			          {% for node in pages_list %}
				          {% if node.title != null %}
					            {% if node.layout == "page" %}
						                <a class="sidebar-nav-item{% if page.url == node.url %} active{% endif %}" href="{{ site.baseurl }}{{ node.url  | remove_first: '/' }}">{{ node.title }}</a>
								          {% endif %}
									          {% endif %}
										  {% endfor %}
{% endraw %}

For the pages we want in the navigation, we’ll add a navigation_weight to the front matter. The value of navigation_weight is a number which dictates the position it’s shown. For index.html we’ll add a navigation_weight of 1.

---
layout: default
title: Home
navigation_weight: 1
---
{% raw %}
<nav class="main-nav">
  <ul>
    {% assign navigation_pages = site.html_pages | sort: 'navigation_weight' %}
    {% for p in navigation_pages %}
      {% if p.navigation_weight %}
        <li>
          <a href="{{ p.url }}" {% if p.url == page.url %}class="active"{% endif %}>
            {{ p.title }}
          </a>
        </li>
      {% endif %}
    {% endfor %}
  </ul>
</nav>
...
{% endraw %}

## For loops with content stored in different collections

for doc in site.collections[collection_name] ??
site.documents accesses a list of all the documents in every collection

- load time for for loop through large number of pages is issue


those pages. also maybe provide collections as an example for doing that.
