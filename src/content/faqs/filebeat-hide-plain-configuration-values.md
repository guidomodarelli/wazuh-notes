---
date: "2020/09/15"
title: "Hide sensitive values in the Filebeat configuration file"
author: ""
description: "Hide sensitive values in the Filebeat configuration file as credentials, urls"
tags: [ "filebeat", "configuration", "hide", "credentials", "password" ]
version: ""
---

## Issue

Hide sensitive values in the configuration file.

## Remediation

Use the Filebeat keystore. More info in https://www.elastic.co/guide/en/beats/filebeat/7.10/keystore.html

1. Create the Filebeat keystore

    ```sh
    filebeat keystore create
    ```

2. Add a value

    ```sh
    filebeat keystore add ${KEY_NAME}
    ```

    where:

    - `${KEY_NAME}`: is the name of key

    After a prompt requires you write the value.

    For example:

    ```sh
    filebeat keystore add admin_password
    ```

    > Note: You can add the values from stdin. More info in the documentation link.

3. Replace the key in the configuration file (located in `/etc/filebeat/filebeat.yml`).

    Access to the value using the syntax: `${KEY_NAME}`.

    For example:

    ```yml
    output.elasticsearch.password: "${admin_password}"
    ```
