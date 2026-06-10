# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `Angular README`, you can find it at [`dataconnect-generated/angular/README.md`](./angular/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListMyEvents*](#listmyevents)
- [**Mutations**](#mutations)
  - [*CreateEvent*](#createevent)
  - [*JoinEvent*](#joinevent)
  - [*VoteOnPollOption*](#voteonpolloption)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListMyEvents
You can execute the `ListMyEvents` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyEvents(options?: ExecuteQueryOptions): QueryPromise<ListMyEventsData, undefined>;

interface ListMyEventsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyEventsData, undefined>;
}
export const listMyEventsRef: ListMyEventsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyEvents(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyEventsData, undefined>;

interface ListMyEventsRef {
  ...
  (dc: DataConnect): QueryRef<ListMyEventsData, undefined>;
}
export const listMyEventsRef: ListMyEventsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyEventsRef:
```typescript
const name = listMyEventsRef.operationName;
console.log(name);
```

### Variables
The `ListMyEvents` query has no variables.
### Return Type
Recall that executing the `ListMyEvents` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyEventsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyEventsData {
  events: ({
    id: UUIDString;
    title: string;
    eventDate: TimestampString;
    description?: string | null;
    location?: string | null;
  } & Event_Key)[];
}
```
### Using `ListMyEvents`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyEvents } from '@dataconnect/generated';


// Call the `listMyEvents()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyEvents();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyEvents(dataConnect);

console.log(data.events);

// Or, you can use the `Promise` API.
listMyEvents().then((response) => {
  const data = response.data;
  console.log(data.events);
});
```

### Using `ListMyEvents`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyEventsRef } from '@dataconnect/generated';


// Call the `listMyEventsRef()` function to get a reference to the query.
const ref = listMyEventsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyEventsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.events);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.events);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateEvent
You can execute the `CreateEvent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createEvent(vars: CreateEventVariables): MutationPromise<CreateEventData, CreateEventVariables>;

interface CreateEventRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateEventVariables): MutationRef<CreateEventData, CreateEventVariables>;
}
export const createEventRef: CreateEventRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createEvent(dc: DataConnect, vars: CreateEventVariables): MutationPromise<CreateEventData, CreateEventVariables>;

interface CreateEventRef {
  ...
  (dc: DataConnect, vars: CreateEventVariables): MutationRef<CreateEventData, CreateEventVariables>;
}
export const createEventRef: CreateEventRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createEventRef:
```typescript
const name = createEventRef.operationName;
console.log(name);
```

### Variables
The `CreateEvent` mutation requires an argument of type `CreateEventVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateEventVariables {
  title: string;
  eventDate: TimestampString;
  description?: string | null;
  location?: string | null;
}
```
### Return Type
Recall that executing the `CreateEvent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateEventData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateEventData {
  event_insert: Event_Key;
}
```
### Using `CreateEvent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createEvent, CreateEventVariables } from '@dataconnect/generated';

// The `CreateEvent` mutation requires an argument of type `CreateEventVariables`:
const createEventVars: CreateEventVariables = {
  title: ..., 
  eventDate: ..., 
  description: ..., // optional
  location: ..., // optional
};

// Call the `createEvent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createEvent(createEventVars);
// Variables can be defined inline as well.
const { data } = await createEvent({ title: ..., eventDate: ..., description: ..., location: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createEvent(dataConnect, createEventVars);

console.log(data.event_insert);

// Or, you can use the `Promise` API.
createEvent(createEventVars).then((response) => {
  const data = response.data;
  console.log(data.event_insert);
});
```

### Using `CreateEvent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createEventRef, CreateEventVariables } from '@dataconnect/generated';

// The `CreateEvent` mutation requires an argument of type `CreateEventVariables`:
const createEventVars: CreateEventVariables = {
  title: ..., 
  eventDate: ..., 
  description: ..., // optional
  location: ..., // optional
};

// Call the `createEventRef()` function to get a reference to the mutation.
const ref = createEventRef(createEventVars);
// Variables can be defined inline as well.
const ref = createEventRef({ title: ..., eventDate: ..., description: ..., location: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createEventRef(dataConnect, createEventVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.event_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.event_insert);
});
```

## JoinEvent
You can execute the `JoinEvent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
joinEvent(vars: JoinEventVariables): MutationPromise<JoinEventData, JoinEventVariables>;

interface JoinEventRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: JoinEventVariables): MutationRef<JoinEventData, JoinEventVariables>;
}
export const joinEventRef: JoinEventRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
joinEvent(dc: DataConnect, vars: JoinEventVariables): MutationPromise<JoinEventData, JoinEventVariables>;

interface JoinEventRef {
  ...
  (dc: DataConnect, vars: JoinEventVariables): MutationRef<JoinEventData, JoinEventVariables>;
}
export const joinEventRef: JoinEventRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the joinEventRef:
```typescript
const name = joinEventRef.operationName;
console.log(name);
```

### Variables
The `JoinEvent` mutation requires an argument of type `JoinEventVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface JoinEventVariables {
  eventId: UUIDString;
}
```
### Return Type
Recall that executing the `JoinEvent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `JoinEventData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface JoinEventData {
  participant_insert: Participant_Key;
}
```
### Using `JoinEvent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, joinEvent, JoinEventVariables } from '@dataconnect/generated';

// The `JoinEvent` mutation requires an argument of type `JoinEventVariables`:
const joinEventVars: JoinEventVariables = {
  eventId: ..., 
};

// Call the `joinEvent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await joinEvent(joinEventVars);
// Variables can be defined inline as well.
const { data } = await joinEvent({ eventId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await joinEvent(dataConnect, joinEventVars);

console.log(data.participant_insert);

// Or, you can use the `Promise` API.
joinEvent(joinEventVars).then((response) => {
  const data = response.data;
  console.log(data.participant_insert);
});
```

### Using `JoinEvent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, joinEventRef, JoinEventVariables } from '@dataconnect/generated';

// The `JoinEvent` mutation requires an argument of type `JoinEventVariables`:
const joinEventVars: JoinEventVariables = {
  eventId: ..., 
};

// Call the `joinEventRef()` function to get a reference to the mutation.
const ref = joinEventRef(joinEventVars);
// Variables can be defined inline as well.
const ref = joinEventRef({ eventId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = joinEventRef(dataConnect, joinEventVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.participant_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.participant_insert);
});
```

## VoteOnPollOption
You can execute the `VoteOnPollOption` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
voteOnPollOption(vars: VoteOnPollOptionVariables): MutationPromise<VoteOnPollOptionData, VoteOnPollOptionVariables>;

interface VoteOnPollOptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: VoteOnPollOptionVariables): MutationRef<VoteOnPollOptionData, VoteOnPollOptionVariables>;
}
export const voteOnPollOptionRef: VoteOnPollOptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
voteOnPollOption(dc: DataConnect, vars: VoteOnPollOptionVariables): MutationPromise<VoteOnPollOptionData, VoteOnPollOptionVariables>;

interface VoteOnPollOptionRef {
  ...
  (dc: DataConnect, vars: VoteOnPollOptionVariables): MutationRef<VoteOnPollOptionData, VoteOnPollOptionVariables>;
}
export const voteOnPollOptionRef: VoteOnPollOptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the voteOnPollOptionRef:
```typescript
const name = voteOnPollOptionRef.operationName;
console.log(name);
```

### Variables
The `VoteOnPollOption` mutation requires an argument of type `VoteOnPollOptionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface VoteOnPollOptionVariables {
  pollOptionId: UUIDString;
}
```
### Return Type
Recall that executing the `VoteOnPollOption` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `VoteOnPollOptionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface VoteOnPollOptionData {
  vote_insert: Vote_Key;
}
```
### Using `VoteOnPollOption`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, voteOnPollOption, VoteOnPollOptionVariables } from '@dataconnect/generated';

// The `VoteOnPollOption` mutation requires an argument of type `VoteOnPollOptionVariables`:
const voteOnPollOptionVars: VoteOnPollOptionVariables = {
  pollOptionId: ..., 
};

// Call the `voteOnPollOption()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await voteOnPollOption(voteOnPollOptionVars);
// Variables can be defined inline as well.
const { data } = await voteOnPollOption({ pollOptionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await voteOnPollOption(dataConnect, voteOnPollOptionVars);

console.log(data.vote_insert);

// Or, you can use the `Promise` API.
voteOnPollOption(voteOnPollOptionVars).then((response) => {
  const data = response.data;
  console.log(data.vote_insert);
});
```

### Using `VoteOnPollOption`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, voteOnPollOptionRef, VoteOnPollOptionVariables } from '@dataconnect/generated';

// The `VoteOnPollOption` mutation requires an argument of type `VoteOnPollOptionVariables`:
const voteOnPollOptionVars: VoteOnPollOptionVariables = {
  pollOptionId: ..., 
};

// Call the `voteOnPollOptionRef()` function to get a reference to the mutation.
const ref = voteOnPollOptionRef(voteOnPollOptionVars);
// Variables can be defined inline as well.
const ref = voteOnPollOptionRef({ pollOptionId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = voteOnPollOptionRef(dataConnect, voteOnPollOptionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vote_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vote_insert);
});
```

