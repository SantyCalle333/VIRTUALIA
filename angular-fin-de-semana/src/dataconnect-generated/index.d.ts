import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateEventData {
  event_insert: Event_Key;
}

export interface CreateEventVariables {
  title: string;
  eventDate: TimestampString;
  description?: string | null;
  location?: string | null;
}

export interface Event_Key {
  id: UUIDString;
  __typename?: 'Event_Key';
}

export interface JoinEventData {
  participant_insert: Participant_Key;
}

export interface JoinEventVariables {
  eventId: UUIDString;
}

export interface ListMyEventsData {
  events: ({
    id: UUIDString;
    title: string;
    eventDate: TimestampString;
    description?: string | null;
    location?: string | null;
  } & Event_Key)[];
}

export interface Participant_Key {
  id: UUIDString;
  __typename?: 'Participant_Key';
}

export interface PollOption_Key {
  id: UUIDString;
  __typename?: 'PollOption_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface VoteOnPollOptionData {
  vote_insert: Vote_Key;
}

export interface VoteOnPollOptionVariables {
  pollOptionId: UUIDString;
}

export interface Vote_Key {
  id: UUIDString;
  __typename?: 'Vote_Key';
}

interface CreateEventRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateEventVariables): MutationRef<CreateEventData, CreateEventVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateEventVariables): MutationRef<CreateEventData, CreateEventVariables>;
  operationName: string;
}
export const createEventRef: CreateEventRef;

export function createEvent(vars: CreateEventVariables): MutationPromise<CreateEventData, CreateEventVariables>;
export function createEvent(dc: DataConnect, vars: CreateEventVariables): MutationPromise<CreateEventData, CreateEventVariables>;

interface JoinEventRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: JoinEventVariables): MutationRef<JoinEventData, JoinEventVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: JoinEventVariables): MutationRef<JoinEventData, JoinEventVariables>;
  operationName: string;
}
export const joinEventRef: JoinEventRef;

export function joinEvent(vars: JoinEventVariables): MutationPromise<JoinEventData, JoinEventVariables>;
export function joinEvent(dc: DataConnect, vars: JoinEventVariables): MutationPromise<JoinEventData, JoinEventVariables>;

interface ListMyEventsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyEventsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyEventsData, undefined>;
  operationName: string;
}
export const listMyEventsRef: ListMyEventsRef;

export function listMyEvents(options?: ExecuteQueryOptions): QueryPromise<ListMyEventsData, undefined>;
export function listMyEvents(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyEventsData, undefined>;

interface VoteOnPollOptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: VoteOnPollOptionVariables): MutationRef<VoteOnPollOptionData, VoteOnPollOptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: VoteOnPollOptionVariables): MutationRef<VoteOnPollOptionData, VoteOnPollOptionVariables>;
  operationName: string;
}
export const voteOnPollOptionRef: VoteOnPollOptionRef;

export function voteOnPollOption(vars: VoteOnPollOptionVariables): MutationPromise<VoteOnPollOptionData, VoteOnPollOptionVariables>;
export function voteOnPollOption(dc: DataConnect, vars: VoteOnPollOptionVariables): MutationPromise<VoteOnPollOptionData, VoteOnPollOptionVariables>;

