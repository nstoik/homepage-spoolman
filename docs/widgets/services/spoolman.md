---
title: Spoolman
description: Spoolman Widget Configuration
---

Learn more about [Spoolman](https://github.com/Donkie/Spoolman).

4 spools are displayed by default. If more than 4 spools are configured in spoolman you can use the spoolIds configuration option to control which are displayed. You can also use the spoolSort option to sort the spools by last used or least remaining.

```yaml
widget:
  type: spoolman
  url: http://spoolman.host.or.ip
  spoolIds: [1, 2, 3, 4] # optional
  spoolSort: lastUsed | leastRemaining # optional
```
