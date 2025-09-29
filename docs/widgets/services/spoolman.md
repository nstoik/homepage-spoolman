---
title: Spoolman
description: Spoolman Widget Configuration
---

Learn more about [Spoolman](https://github.com/Donkie/Spoolman).

4 spools are displayed by default in order of spool ID. If more than 4 spools are configured in spoolman you can use the filter options to filter the spools by id, location, lot_nr, or comment. You can also sort the spools by last used or least remaining.

```yaml
widget:
  type: spoolman
  url: http://spoolman.host.or.ip
  spoolSort: lastUsed | leastRemaining # optional
  spoolFilter: id | location | lot_nr | comment # optional
  spoolFilterValues: [value1, value2] # optional
```
