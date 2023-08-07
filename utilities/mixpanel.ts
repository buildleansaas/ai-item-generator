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
  return new Promise((resolve, reject) => {
    mixpanel.track(
      eventName,
      { distinct_id: userId, ...properties },
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(undefined);
        }
      }
    );
  });
}

export function updateUser(userId: string, properties: Mixpanel.PropertyDict) {
  return new Promise((resolve, reject) => {
    mixpanel.people.set(userId, properties, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(undefined);
      }
    });
  });
}
