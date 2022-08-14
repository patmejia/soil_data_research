# Updating snapshots
If a snapshot assert fails it is up to the developer to either verify that the current input is incorrect and fix it, or to establish that the input is an update and therefore correct. In the event that the input is correct the SNAP environment variable or the brittle CLI tool can be used to update the snapshot.

## Directly with Node
To update all snapshots in a test file:
```sh
SNAP=1 node path/to/test.js
```
To update a specific snapshot:
```sh
SNAP="name of snapshot" node path/to/test.js
```