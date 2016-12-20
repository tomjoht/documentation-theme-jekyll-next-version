---
title: Sample2 topic - German
permalink: thing2.html
sidebar: generic_de
product: Generic
---

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Create a file called samplelist.yml in _data.

Put something like this in it:

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

Now loop through it like this:

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
