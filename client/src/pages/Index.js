import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { perPage } from "../config";
import { QUERY_ALL_GAMES } from "../utils/queries";
import Homepage from "./Homepage";

export default function Index() {
  return (
    <Homepage />
  )
}