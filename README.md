# Node.js Wrapper for WaniKani

```This library is under construction. If you are interested in contributing, please feel free!```

A very thin wrapper between the WaniKani API and your Node.js application.

As with most wrappers, its strengths are twofold: simplifying and parsing. **This wrapper does not cache.**

## Data Groups
There are two data groups that contain all information pertaining to either WaniKani as a whole (`Collection`) or a specific user (`Member`).

A `Collection` object contains WaniKani's spaced repetition systems, subjects, and voice actors. A `Member` object contains information pertaining to a specific user from WaniKani, including user information, progressions, resets, reviews, review statistics, study materials, and summaries. Both objects require a WaniKani user token to be selected, or they will return a `401 Unauthorized` error.

Both objects contain a `timestamp` integer of when they were created, to allow you to cache and decide when to update to prevent spamming WaniKani's API with requests.

All values and functions under either object return promises (except for timestamps and `Member` tokens).

### Member

This is what a `Member` object should look like:

```
Member {
  token: 'USER_TOKEN',
  timestamp: 2021-05-04T21:16:44.237Z,
  user: Promise { <pending> },
  lessons: Promise { <pending> },
  resets: Promise { <pending> },
  reviews: Promise { <pending> },
  review_statistics: Promise { <pending> },
  study_materials: Promise { <pending> },
  summary: Promise { <pending> }
}
```

Additionally, you may update the member as appropriate with the following functions:

```javascript
  Member.update_user(data); // https://docs.api.wanikani.com/20170710/#update-user-information

  Member.start_assignment(data); // https://docs.api.wanikani.com/20170710/#start-an-assignment

  Member.create_review(data); // https://docs.api.wanikani.com/20170710/#create-a-review

  Member.create_study_material(data); // https://docs.api.wanikani.com/20170710/#create-a-study-material

  Member.update_study_material(data); // https://docs.api.wanikani.com/20170710/#update-a-study-material
```

As this is a very thin wrapper, we do not do any form of validation before attempting to update these values. Please reference the WaniKani API documentation for best practices and expected data for these functions. https://docs.api.wanikani.com/20170710/#respecting-subscription-restrictions

### Collection

This is what a `Collection` object should look like:

```
Collection {
  timestamp: 2021-05-04T21:16:44.237Z,
  srs: Promise { <pending> };
  subject: Promise { <pending> };
  voice_actors: Promise { <pending> };
}
```

There are no functions pertaining to a `Collection` object.

## Examples

```javascript
const wk = require('wk-wrapper');

const member = new wk.Member('USER_TOKEN');

console.log(await member.user.username); // Will return the username associated with the user token given
```

```javascript
const wk = require('wk-wrapper');

const member = new wk.Collection('USER_TOKEN');

console.log(await member.srs); // Will return the below JSON
```

Example Console Output

```json
{
  object: 'collection',
  url: 'https://api.wanikani.com/v2/spaced_repetition_systems',
  pages: { per_page: 500, next_url: null, previous_url: null },
  total_count: 2,
  data_updated_at: '2020-06-09T03:38:01.007395Z',
  data: [
    {
      id: 1,
      object: 'spaced_repetition_system',
      url: 'https://api.wanikani.com/v2/spaced_repetition_systems/1',
      data_updated_at: '2020-06-09T03:36:51.134752Z',
      data: [Object]
    },
    {
      id: 2,
      object: 'spaced_repetition_system',
      url: 'https://api.wanikani.com/v2/spaced_repetition_systems/2',
      data_updated_at: '2020-06-09T03:38:01.007395Z',
      data: [Object]
    }
  ]
}
```