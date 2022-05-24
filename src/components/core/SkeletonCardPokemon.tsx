import { Skeleton } from "@chakra-ui/react";

export function SkeletonCardPokemon() {
    return (
        <>
            <Skeleton w="165px" h="115px" borderRadius={8} />
            <Skeleton w="165px" h="115px" borderRadius={8} />
            <Skeleton w="165px" h="115px" borderRadius={8} />
            <Skeleton w="165px" h="115px" borderRadius={8} />
            <Skeleton w="165px" h="115px" borderRadius={8} />
        </>
    )
}