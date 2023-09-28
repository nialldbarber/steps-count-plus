/**
 * @plan
 *
 * * daily
 * - this should be pretty easy, i can get this from `getStepCount`
 * * weekly
 * - the week starts on monday
 * - get the date of the week, if it is monday, then that is the start date
 * - if it is more than monday, get the previous monday
 * - get the end of the week, this should be the sunday after monday
 * - hopefully we can show each day with the data, some should be blank
 * * monthly
 * - this should be a similar process to weekly, but instead of finding
 * - monday, find the first day of the month and the end of the month
 * - based on the current date.
 *
 * ? considersations
 * - given how much heavy lifting we'll need to do with dates, we'll
 * - most likely need to rely on a date library like luxon
 * ? first consider if the react native library provides any helpers that
 * ? might make the process easier
 */
import { enableMapSet, produce } from "immer";
import { create } from "zustand";

enableMapSet();

export type HealthDataSteps = {
  value: number;
  setSteps: (steps: number) => void;
};
export type HealthDataDistance = {
  value: number;
  setDistance: (distance: number) => void;
};
export type HealthDataFlights = {
  value: number;
  setFlights: (flights: number) => void;
};

export type HealthDataState = {
  daily: {
    steps: HealthDataSteps;
    distance: HealthDataDistance;
    flights: HealthDataFlights;
  };
  weekly: {
    steps: HealthDataSteps;
    distance: HealthDataDistance;
    flights: HealthDataFlights;
  };
  monthly: {
    steps: HealthDataSteps;
    distance: HealthDataDistance;
    flights: HealthDataFlights;
  };
};

export const useHealthStore = create<HealthDataState>((set) => ({
  daily: {
    steps: {
      value: 0,
      setSteps: (steps) => {
        set(
          produce(
            (state: HealthDataState) => (state.daily.steps.value = steps),
          ),
        );
      },
    },
    distance: {
      value: 0,
      setDistance: (distance) => {
        set(
          produce(
            (state: HealthDataState) => (state.daily.distance.value = distance),
          ),
        );
      },
    },
    flights: {
      value: 0,
      setFlights: (flights) => {
        set(
          produce(
            (state: HealthDataState) => (state.daily.flights.value = flights),
          ),
        );
      },
    },
  },
  weekly: {
    steps: {
      value: 0,
      setSteps: () => {},
    },
    distance: {
      value: 0,
      setDistance: () => {},
    },
    flights: {
      value: 0,
      setFlights: () => {},
    },
  },
  monthly: {
    steps: {
      value: 0,
      setSteps: () => {},
    },
    distance: {
      value: 0,
      setDistance: () => {},
    },
    flights: {
      value: 0,
      setFlights: () => {},
    },
  },
}));
