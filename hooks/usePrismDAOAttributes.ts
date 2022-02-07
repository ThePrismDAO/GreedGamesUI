import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function usePrismDAOAttributes() {
   const { data, error } = useSWR("https://member.greed.games/collection/", fetcher);
   if (error) return "An error has occurred. "+error;
   if (!data) return "Loading...";
   return data;
}
 
