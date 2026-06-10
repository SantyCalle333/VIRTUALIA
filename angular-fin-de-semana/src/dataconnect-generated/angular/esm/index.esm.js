import { createEventRef, joinEventRef, listMyEventsRef, voteOnPollOptionRef } from '../../';
import { DataConnect, CallerSdkTypeEnum } from '@angular/fire/data-connect';
import { injectDataConnectQuery, injectDataConnectMutation } from '@tanstack-query-firebase/angular/data-connect';
import { inject, EnvironmentInjector } from '@angular/core';
export function injectCreateEvent(args, injector) {
  return injectDataConnectMutation(createEventRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectJoinEvent(args, injector) {
  return injectDataConnectMutation(joinEventRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListMyEvents(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listMyEventsRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectVoteOnPollOption(args, injector) {
  return injectDataConnectMutation(voteOnPollOptionRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

