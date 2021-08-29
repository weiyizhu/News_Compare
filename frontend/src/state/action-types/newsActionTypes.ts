import { NewsResponseProps } from "../../types";

export enum NewsActionType {
  UPDATE_NEWS = "UPDATE_NEWS",
}

export type NewsActionPayload = {
  posts?: NewsResponseProps[] | null;
};

export type NewsAction = {
  type: NewsActionType.UPDATE_NEWS;
  payload: NewsResponseProps[] | undefined | null;
};
