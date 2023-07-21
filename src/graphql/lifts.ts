import { gql } from "@apollo/client";

export const GET_ALL_LIFTS_BY_STATUS = gql`
  query GetAllLiftsByStatus($status: LiftStatus) {
    allLifts(status: $status) {
      id
      name
      elevationGain
      status
    }
  }
`;

export const GET_LIFT_BY_ID = gql`
  query GetLiftById($id: ID!) {
    Lift(id: $id) {
      name
      elevationGain
      status
      trailAccess {
        name
        status
      }
    }
  }
`;

export const UPDATE_LIFT_STATUS = gql`
  mutation UpdateLiftStatus($id: ID!, $status: LiftStatus!) {
    setLiftStatus(id: $id, status: $status) {
      id
      name
      elevationGain
      status
    }
  }
`;
