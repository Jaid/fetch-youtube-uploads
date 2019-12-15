# fetch-youtube-uploads


Returns a YouTube channel&#x27;s latest uploads. Fetching is done with user requests instead of APIs.

## Installation
<a href='https://npmjs.com/package/fetch-youtube-uploads'><img alt='npm logo' src='https://github.com/Jaid/action-readme/raw/master/images/base-assets/npm.png'/></a>
```bash
npm install --save fetch-youtube-uploads@^2.0.0
```
<a href='https://yarnpkg.com/package/fetch-youtube-uploads'><img alt='Yarn logo' src='https://github.com/Jaid/action-readme/raw/master/images/base-assets/yarn.png'/></a>
```bash
yarn add fetch-youtube-uploads@^2.0.0
```



## Documentation

* [fetch-youtube-uploads](#module_fetch-youtube-uploads)
    * [module.exports(channelId, options)](#exp_module_fetch-youtube-uploads--module.exports) ⇒ <code>Promise.&lt;Array.&lt;Video&gt;&gt;</code> ⏏
        * _static_
            * [.NoResultsError](#module_fetch-youtube-uploads--module.exports.NoResultsError) ⇐ <code>Error</code>
            * [.fetchUploadsFromHtml(html)](#module_fetch-youtube-uploads--module.exports.fetchUploadsFromHtml) ⇒ <code>Array.&lt;Video&gt;</code>
            * [.fetchUploadsForUser(userId, options)](#module_fetch-youtube-uploads--module.exports.fetchUploadsForUser) ⇒ <code>Promise.&lt;Array.&lt;Video&gt;&gt;</code>
        * _inner_
            * [~Video](#module_fetch-youtube-uploads--module.exports..Video) : <code>Object</code>
            * [~Options](#module_fetch-youtube-uploads--module.exports..Options) : <code>Object</code>

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| channelId | <code>string</code> | 
| options | <code>Options</code> | 

**Kind**: static class of [<code>module.exports</code>](#exp_module_fetch-youtube-uploads--module.exports)  
**Extends**: <code>Error</code>  
**Kind**: static method of [<code>module.exports</code>](#exp_module_fetch-youtube-uploads--module.exports)  

| Param | Type |
| --- | --- |
| html | <code>string</code> | 

**Kind**: static method of [<code>module.exports</code>](#exp_module_fetch-youtube-uploads--module.exports)  

| Param | Type |
| --- | --- |
| userId | <code>string</code> | 
| options | <code>Options</code> | 

**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_fetch-youtube-uploads--module.exports)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> |  |
| title | <code>string</code> |  |
| published | <code>boolean</code> | If `false`, a reminder button was found which usually means that the video entry is a future premiere |

**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_fetch-youtube-uploads--module.exports)  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| [retries] | <code>number</code> | <code>3</code> | 



## License
```text
MIT License

Copyright © 2019, Jaid <jaid.jsx@gmail.com> (github.com/jaid)

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
```
