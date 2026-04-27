'use client';

import { useState } from "react";
import "./styles.css";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import Paginador from "@/components/paginador/index";
import { useQuery } from "@apollo/client/react";
import { GET_CHARACTERS } from "@/features/characters/queries";
import {
  GetCharactersQuery,
  GetCharactersQueryVariables,
} from "@/gql/graphql";

const Page = () => {
  const [page, setPage] = useState<number>(1);

  const { data, loading, error } = useQuery<
    GetCharactersQuery,
    GetCharactersQueryVariables
  >(GET_CHARACTERS, {
    variables: {
      page,
      filter: {},
    },
  });

  const characters = data?.characters?.results ?? [];
  const info = data?.characters?.info;

  return (
    <div className="mainContainer">
      <h1 className="mainTitleHeader">Rick & Morty Characters</h1>

      {loading && <h2 className="noResults">cargando...</h2>}
      {error && <h2 className="noResults">Error: {error.message}</h2>}

      <div className="cardDisplay">
        {characters.map((char) =>
          char ? (
            <CharacterCard key={char.id} character={char} />
          ) : null
        )}
      </div>

      {info && (
        <Paginador
          page={page}
          setPage={setPage}
          next={!!info.next}
          prev={!!info.prev}
        />
      )}
    </div>
  );
};

export default Page;