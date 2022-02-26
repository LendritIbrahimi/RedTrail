# RedTrail &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/LendritIbrahimi/RedTrail/blob/main/LICENSE)

RedTrail is an application in development that allows the generation of a narrated video from reddit posts.

## Installation

Use the node package manager to install the application.

```
npm install
```

## Usage

In order to run the application, you need to run the following command:

```
ts-node app.ts
```

To get a description of available options:

```
Usage: app [options]

Options:
  --clientId <type>              Reddit client ID
  --clientSecret <type>          Reddit client secret
  --username <type>              Reddit username
  --password <type>              Reddit password
  --subReddit <type>             Subreddit name (default: "AskReddit")
  --redditType <type>            Reddit kind of topic to fetch (default: "top")
  --redditNumber <type>          Reddit number of posts to fetch (default: "1")
  --redditCommentsNumber <type>  Reddit number of comments to show per post (default: "1")
  -h, --help                     display help for command
```

## License
RedTrail is [MIT licensed](./LICENSE).
