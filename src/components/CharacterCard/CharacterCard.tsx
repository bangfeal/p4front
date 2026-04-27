"use client";

import Link from "next/link";
import Image from "next/image";
import { GetCharactersQuery } from "@/gql/graphql";
import "./CharacterCard.css";

type Character = NonNullable<
  NonNullable<NonNullable<GetCharactersQuery["characters"]>["results"]>[number]
>;

type CharacterProps = {
  character: Character;
};

const CharacterCard = ({ character }: CharacterProps) => {

  return (
    <Link href={`/character/${character.id}`} className="cardButton">
      {character.image && (
        <Image
          width={300}
          height={300}
          className="cardImage"
          src={character.image}
          alt={character.name ?? "Personaje"}
        />
      )}
      <div className="cardText">
        <h2>{character.name}</h2>
        <p>
          {character.status ?? "Unknown"}
        </p>
      </div>
    </Link>
  );
};

export default CharacterCard;