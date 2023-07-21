import { LiftStatus } from "../generated/graphql";

export type TSelectLiftStatusValue = LiftStatus | undefined | "ALL";
type TExtendedLiftStatus = LiftStatus | "ALL";

export interface ISelectLIftStatusArray {
  value: TSelectLiftStatusValue;
  label: TExtendedLiftStatus;
}

export const LIFTS_STATUSES: ISelectLIftStatusArray[] = [
  {
    value: undefined,
    label: "ALL",
  },
  {
    value: LiftStatus.Open,
    label: LiftStatus.Open,
  },
  {
    value: LiftStatus.Closed,
    label: LiftStatus.Closed,
  },
  {
    value: LiftStatus.Hold,
    label: LiftStatus.Hold,
  },
];

export const CHANGE_LIFTS_STATUSES: ISelectLIftStatusArray[] = [
  {
    value: LiftStatus.Open,
    label: LiftStatus.Open,
  },
  {
    value: LiftStatus.Closed,
    label: LiftStatus.Closed,
  },
  {
    value: LiftStatus.Hold,
    label: LiftStatus.Hold,
  },
];
