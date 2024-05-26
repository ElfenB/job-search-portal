import { trpc } from "../api/trpc";

export function useOfferListData(userId: string, personal?: boolean) {
  if (personal) {
    return trpc.job.listMy.useQuery(userId);
  }
  return trpc.job.list.useQuery(userId);
}
