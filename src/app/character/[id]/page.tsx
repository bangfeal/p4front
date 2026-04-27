'use client';

import "./styles.css";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import { GET_CHARACTER_BY_ID } from "@/features/characters/queries";
import {
  GetCharacterByIdQuery,
  GetCharacterByIdQueryVariables,
} from "@/gql/graphql";

const Page = () => {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const { data, loading, error } = useQuery<
    GetCharacterByIdQuery,
    GetCharacterByIdQueryVariables
  >(GET_CHARACTER_BY_ID, {
    variables: { id },
    skip: !id,
  });

  const character = data?.character;

  return (
    <div className="mainContainerInd">
      <button
        className="homeButton"
        onClick={() => router.push("/")}
      >
        Volver
      </button>

      {loading && <h2>Cargando...</h2>}
      {error && <h2>Error: {error.message}</h2>}

      {character && (
        <>
          <div className="imageContainer">
            <img
              src={character.image ?? ""}
              className="charImage"
              alt={character.name ?? "Character"}
            />
          </div>

          <div className="text">
            <h1 className="charName">
              {character.name}
            </h1>

            <h2 className="species">
              {character.species}
            </h2>

            <div>
              Status: {character.status}<br />
              Gender: {character.gender}<br />
              Origin: {character.origin?.name}<br />
              Dimension: {character.origin?.dimension ?? "unknown"}<br />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;