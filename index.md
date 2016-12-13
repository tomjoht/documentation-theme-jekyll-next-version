---
title: Next version of documentation theme for Jekyll
permalink: index.html
sidebar: generic
topnav: topnav
---

{% if site.language == "english" %}
{% include_relative index_en.md %}
{% elsif site.language == "japanese" %}
{% include_relative index_ja.md %}
{% elsif site.language == "german" %}
{% include_relative index_de.md %}
{% endif %}
