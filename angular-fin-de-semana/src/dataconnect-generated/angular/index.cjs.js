const { createEventRef, joinEventRef, listMyEventsRef, voteOnPollOptionRef } = require('../');
const { DataConnect, CallerSdkTypeEnum } = require('@angular/fire/data-connect');
const { injectDataConnectQuery, injectDataConnectMutation } = require('@tanstack-query-firebase/angular/data-connect');
const { inject, EnvironmentInjector } = require('@angular/core');

exports.injectCreateEvent = function injectCreateEvent(args, injector) {
  return injectDataConnectMutation(createEventRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectJoinEvent = function injectJoinEvent(args, injector) {
  return injectDataConnectMutation(joinEventRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectListMyEvents = function injectListMyEvents(options, injector) {
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

exports.injectVoteOnPollOption = function injectVoteOnPollOption(args, injector) {
  return injectDataConnectMutation(voteOnPollOptionRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

