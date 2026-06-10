import { CreateEventData, CreateEventVariables, JoinEventData, JoinEventVariables, ListMyEventsData, VoteOnPollOptionData, VoteOnPollOptionVariables } from '../';
import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise} from '@angular/fire/data-connect';
import { CreateQueryResult, CreateMutationResult} from '@tanstack/angular-query-experimental';
import { CreateDataConnectQueryResult, CreateDataConnectQueryOptions, CreateDataConnectMutationResult, DataConnectMutationOptionsUndefinedMutationFn } from '@tanstack-query-firebase/angular/data-connect';
import { FirebaseError } from 'firebase/app';
import { Injector } from '@angular/core';

type CreateEventOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateEventData, FirebaseError, CreateEventVariables>;
export function injectCreateEvent(options?: CreateEventOptions, injector?: Injector): CreateDataConnectMutationResult<CreateEventData, CreateEventVariables, CreateEventVariables>;

type JoinEventOptions = DataConnectMutationOptionsUndefinedMutationFn<JoinEventData, FirebaseError, JoinEventVariables>;
export function injectJoinEvent(options?: JoinEventOptions, injector?: Injector): CreateDataConnectMutationResult<JoinEventData, JoinEventVariables, JoinEventVariables>;

export type ListMyEventsOptions = () => Omit<CreateDataConnectQueryOptions<ListMyEventsData, undefined>, 'queryFn'>;
export function injectListMyEvents(options?: ListMyEventsOptions, injector?: Injector): CreateDataConnectQueryResult<ListMyEventsData, undefined>;

type VoteOnPollOptionOptions = DataConnectMutationOptionsUndefinedMutationFn<VoteOnPollOptionData, FirebaseError, VoteOnPollOptionVariables>;
export function injectVoteOnPollOption(options?: VoteOnPollOptionOptions, injector?: Injector): CreateDataConnectMutationResult<VoteOnPollOptionData, VoteOnPollOptionVariables, VoteOnPollOptionVariables>;
