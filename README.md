# WaniKani.js
## A Node.js Wrapper for the WaniKani API

> This library is usable, but still under construction. If you experience a bug, please report it under Github issues on our repo: https://github.com/zmontgo/Nodejs-WaniKani/issues.

A very thin wrapper between the WaniKani API and your Node.js application.

As with most wrappers, its strengths are twofold: simplifying and parsing. **This wrapper does not cache data for you.**

## Data Groups
Since it's very likely you will want to cache large amounts of data, WaniKani.js offers two data groups that contain all information pertaining to either WaniKani as a whole (`Collection`) or a specific user (`Member`). Avoid calling these too often, as they simulteneously call many endpoints. Instead, use these solely for caching, and update your cache periodically with the returned timestamp.

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

Creating a `Member` object also allows specifying filters that are applied to every endpoint (avoid trying to get a specific entry through this, however. Use endpoint functions with specific filters instead). Use this to quickly fetch updated data, and use our `mergeMembers()` function to merge old and new `Member` data together.

Additionally, you may update a WaniKani user as appropriate with the following functions:

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

### Examples

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

```
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

## Endpoints

`Endpoint` functions provide an easy way to talk directly to specific endpoints from WaniKani's API. Initiating an `Endpoint` object is similar to creating a data group object, as both require a user token to be created. In this way, they may be thought of as lower-level `Member` objects, as any user-specific data will pertain to the user token supplied.

Following is a list of all `Endpoint` functions:

```javascript
  Endpoints.assignments(data); // Gets a single assignment, specified by ID, or a list of all assignments if ID is not included.

  Endpoints.progressions(data); // Gets a single progression pertaining to a user, specified by ID, or a list of all progressions pertaining to a user if ID is not included.

  Endpoints.resets(data); // Gets information about a user's resets.

  Endpoints.reviews(data); // Gets information about a user's resets.

  Endpoints.create_review(data); // Create a review for a user.

  Endpoints.review_stats(data); // Gets information about a user's review statistics.

  Endpoints.study_materials(data); // Gets information about a user's study materials.

  Endpoints.subjects(data); // Gets information about WaniKani's subjects.

  Endpoints.summary(data); // Gets a summary of a user's upcoming lessons for a user.

  Endpoints.srs(data); // Gets information about general spaced repetition systems.

  Endpoints.user(data); // Gets general information pertaining to a specific user.

  Endpoints.voice_actors(data); // Gets information about WaniKani's voice actors.
```

`data` is a JSON object containing filters.
> - An `id` value will be parsed to select only that specific id (for instance, selecting a single assignment by ID, rather than all assignments).
> - A `revision` value will be parsed to select data from a specific WaniKani revision. https://docs.api.wanikani.com/20170710/#revisions-aka-versioning
> - A `filter` object will be parsed to include all values inside the GET request. For example, the following would be parsed as `?subject_ids=6,page_after_id=2`:
```
filter {
  subject_ids: 6,
  page_after_id: 2
}
```

## Utilities

WaniKani.js offers a few utility functions you may need.

> - `parseDate(date)` parses a JavaScript `Date` object for use in `If-Modified-Since` filters.
> - `mergeMembers(old_member, new_member)` combines a `Member`-like object (presumably from a database or local cache) and a new `Member` object, to allow you to select updated data and merge the data for faster requests. Note that it `await`s the specific fields inside the new `Member` object; you may select it and pass it directly into the function. It does expect all fields to be present in both objects, but it does not need to be an instance of the `Member` class.
> - `mergeCollections(old_collection, new_collection)` is like `mergeMembers()` but merges collections.
