---
date: "2024/10/18"
title: Filter searches in Discover using IP ranges or network mask with DQL
author: "Desvelao"
description: ""
tags:  [ "discover", "dql", "ip", "network", "mask", "ranges" ]
version: ""
---

The field `data.srcip` is present in Wazuh alerts. For the indices where Wazuh alerts are stored, a template is defined and indexed in Wazuh deployments, which, among other things, defines the mappings of certain fields. Specifically, the field `data.srcip` is defined in that template, so the mapping should be changed from `keyword` to `ip`.

To "update" the mapping of a field:

1. Edit the template of the alert indices where the field `data.srcip` appears, changing the mapping from `keyword` to `ip`. This can be done using:

   - Wazuh indexer API
   - Edit the template definition file. Since Wazuh deployments do this via this mechanism, you would edit the file `/etc/filebeat/wazuh-template.json` and then have `Filebeat` update the template using the command:

      ```sh
      filebeat setup --index-management
      ```
   > If the file was edited and the template updated via Filebeat, perform this process on each Wazuh server node if you have a cluster belonging to the same environment. This process avoids having different template definitions on the different Wazuh server nodes in the same cluster and prevents one node from overwriting the field defined on another node.

2. Verify that the mapping change for `data.srcip` in the `wazuh` template (_the default name assigned to the Wazuh alert template in Wazuh deployments_) is defined. Using the `Dev Tools` (from Wazuh indexer) in the Wazuh dashboard:

   ```http
   GET _template/wazuh
   ```
   And check that the field `data.srcip` has the updated mapping.

Steps 1 and 2 will ensure that new indices generated should include the modification in the mapping, but this will not cause existing indices before the change to take the updated mapping. Since an established mapping in an index cannot be edited, a reindexing process must be carried out for each of the desired indices.

For example, if the `wazuh-alerts-4.x-2024.10.16` index has the mapping of `data.srcip` as `keyword` instead of `ip` which is the desired one:

R0. It would be advisable to stop the Wazuh servers in the cluster or stop the Filebeat of those machines so that they do not index information during the reindexing process.
R1. Reindex the entire index to a new non-existent index. It is important that the new index does not exist and that its name matches the template to which the mapping definition applies, this will cause the template definition to apply to the new index when it is created inheriting the previously established mapping definition. From the `Dev Tools` (of `Index`/`Indexer management`) in **Wazuh dashboard**:

  ```http
  POST _reindex
  {
    "source": {
      "index": "wazuh-alerts-4.x-2024.10.16"
    },
    "dest": {
      "index": "wazuh-alerts-4.x-2024.10.16-reindexed"
    }
  }
  ```

Note that the name of the destination index (`wazuh-alerts-4.x-2024.10.16-reindexed`), matches the indexes to which the template `wazuh-alerts-4.x-*` and `wazuh-archives-4.x-*` applies.
If the reindexing was successful, you would have 2 indexes with the same data and with the difference in the mappings.
The mappings of an index can be checked in the `Index/Indexer management > Dev Tools` from Wazuh dashboard with:

```http
GET <index-name/index-pattern>/_mapping/field/<field>
```

For `data.srcip`:

```http
GET wazuh-alerts-*/_mapping/field/data.srcip
```

This should show the mapping for the `data.srcip` field of all indexes whose name matches the pattern of `wazuh-alerts-*` (`*` is a wildcard and represents any character and repeated any number of times)

R3. After reindexing the data and as usual you do not want the duplicate information in the index pattern, it is usually deleted the source index after the index has been successfully reindexed.

To delete an index:

```http
DELETE <index-name>
```
In the case of `wazuh-alerts-4.x-2024.10.16`:

```http
DELETE wazuh-alerts-4.x-2024.10.16
```

By deleting the source index, the reindexed index, which we'll call `wazuh-alerts-4.x-2024.10.16-reindexed`, will remain. The reindexing process to "update" the mapping of `data.srcip` would have to be done for each of the indexes that has the undesired mapping defined.

R4. Some users may want the index names to be the original ones, and when reindexing to a new index, the name does not match the pattern of the default ones. In case you want to "update" the mapping of a field of existing indexes and keep the original index name, you can do the following:

ER1. Reindex the original index (in the example `wazuh-alerts-4.x-2024.10.16`) to a "temporary" one (like `wazuh-alerts-4.x-2024.10.16-reindexed`)
ER2. Delete the original index (in the example `wazuh-alerts-4.x-2024.10.16`)
ER3. Reindex from the temporary index (in the example `wazuh-alerts-4.x-2024.10.16-reindexed`) to the original one (in the example `wazuh-alerts-4.x-2024.10.16` previously deleted).
ER4. Delete the temporary index (in the example `wazuh-alerts-4.x-2024.10.16-reindexed`)

> Note that this process must be done for each of the indexes whose mapping you want to change, taking into account that there is a template matching these indexes that has the new mapping definitions

R5. Once all the indexes affected by the undesired field mapping have been "updated" and the indexes with the incorrect mapping have been deleted (if you don't want them), you must update the mappings of the Wazuh alerts index pattern from `Dashboard management > Dashboard Management > Index patterns > wazuh-alerts-*`

After the index pattern that groups the indexes updated by the mapping has updated its list of fields, you should be able to search in the `data.srcip` field as you mentioned.

