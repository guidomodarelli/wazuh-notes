---
date: "2022/04/18"
title: "Enable Wazuh archives"
author: ""
description: "Enable Wazuh `archives` in the manager and Filebeat"
tags: [ "filebeat", "archives" ]
version: ""
---

## Issue

Enable `archives` of `wazuh` module.

## Remediation

The alerts generated by Wazuh is a subset of logs that match the Wazuh rules. If you want log all the data:

1. Enable the logging of all logs in the Wazuh manager.

    There is 2 files:
    - `archives.log`: store all logs. In the Wazuh manager set:

      ```xml
      <logall>yes</logall>
      ```

    - `archives.json`: store all logs as json. If you want to index this data to Elasticsearch/Wazuh indexer, enable the setting to store logs to this file.

      ```xml
      <logall_json>yes</logall_json>
      ```

    > Take in account that enable the logging to these files take much space. It is recommended that is disabled if it is not required.

2. Enable the indexation of `archives` logs to Elasticsearch/Wazuh indexer.

    > The `wazuh` module for Filebeat has the `archives` fileset with the configuration to read the `archives.json` and index the data. It is required that the logging to this file is enabled.

      1. Edit the Filebeat configuration `filebeat.yml` located in `/etc/filebeat/filebeat.yml`. Enable the module changing the `archives` `enabled` property to `true`.
          ```yml
          filebeat.modules:
            - module: wazuh
              alerts:
                enabled: true
              archives:
                enabled: true
          ```

      2. Restart Filebeat service. Depending on the process manager:
          ```sh
          systemctl restart filebeat
          # or
          service restart filebeat
          ```
