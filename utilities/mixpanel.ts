import Mixpanel from "mixpanel";

if (process.env.MIXPANEL_TOKEN === undefined) {
  throw new Error("Missing Mixpanel API key");
}

const mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN);

export function track(
  userId: string,
  eventName: string,
  properties?: Mixpanel.PropertyDict
) {
  return new Promise((resolve) => {
    mixpanel.track(eventName, { distinct_id: userId, ...properties }, resolve);
  });
}

export function updateUser(userId: string, properties: Mixpanel.PropertyDict) {
  return new Promise((resolve) => {
    mixpanel.people.set(userId, properties, resolve);
  });
}
