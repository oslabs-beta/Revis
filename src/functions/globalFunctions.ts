import { ServerInterface } from '../context/interfaces';
import {
  CURRENT_SERVER,
  CLEAN_METRICS,
} from '../context/constants/actionTypes';

export const cleanNames = (string: string): string[] => {
  const splitNames: string[] = string.split('_');
  const capitilizeFirstLetter: string[] = splitNames.map((str) => {
    const firstLetter: string = str[0].toUpperCase();
    return `${firstLetter + str.slice(1)}`;
  });
  return capitilizeFirstLetter;
};

export const parseJwt = (token: string) => {
  const base64Payload = token.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64');
  return JSON.parse(payload.toString());
};

export const onLoadFetch = (
  server: ServerInterface,
  selectedServerDispatch,
  metricsDispatch,
  updateCoolDown
) => {
  fetch('/api/validateUser', {
    method: 'POST',
    body: JSON.stringify({ endpoint: server.endpoint }),
  })
    .then((response) => response.json())
    .then((data) => {
      const { password } = parseJwt(data.token);
      if (password) {
        selectedServerDispatch({
          type: CURRENT_SERVER,
          message: {
            name: server.name,
            endpoint: server.endpoint,
            port: server.port,
            password,
          },
        });
        if (updateCoolDown) {
          updateCoolDown(false);
          setTimeout(() => updateCoolDown(true), 10000);
        }

        fetch('/api/retrieveMetrics')
          .then((response) => response.json())
          .then((metricData) => {
            if (metricData.success) {
              const { metricsUpdated } = metricData;
              metricsDispatch({
                type: CLEAN_METRICS,
                message: {
                  metricsUpdated,
                },
              });
            } else {
              fetch('/api/redis', {
                method: 'POST',
                body: JSON.stringify({
                  endpoint: server.endpoint,
                  port: server.port,
                  password,
                }),
              })
                .then((response) => response.json())
                .then((metrics) => {
                  const { metricsUpdated } = metrics;
                  metricsDispatch({
                    type: CLEAN_METRICS,
                    message: {
                      metricsUpdated,
                    },
                  });
                });
            }
          });
      }
    });
};

export const getDate = (date: Date) => {
  const numToMonth = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  };
  const currentDay: string = `${date.getDate()}`;
  const currentMonth: string = numToMonth[`${date.getMonth() + 1}`];
  const currentYear: string = `${date.getFullYear()}`;
  return `${currentMonth}-${currentDay}-${currentYear}`;
};
