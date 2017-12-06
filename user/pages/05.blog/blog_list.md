---
title: Blog
content:
    items: '@self.children'
    leading: 0
    columns: 1
    limit: 5
    order:
        by: date
        dir: desc
    show_date: true
    pagination: true
    url_taxonomy_filters: true
simplesearch:
    route: '@self'
    filters:
        - '@self'
        -
            '@taxonomy':
                - tag
    filter_combinator: and
---

