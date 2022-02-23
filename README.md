RedTrail is an application that allows the generation of a narrated video from reddit posts.

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
MIT License

Copyright (c) 2022 Lendrit Ibrahimi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
