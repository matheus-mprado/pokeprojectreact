import { Flex, Text, Image } from "@chakra-ui/react";
import { ItemEvolve } from "./ItemEvolve";
import { IoIosArrowRoundForward } from 'react-icons/io'
import { api } from "../../../service/api";
import { useEffect, useState } from "react";

interface RowEvolveProps {
    firstImage: string;
    firstName: string;
    secoundImage: string;
    secoundName: string
    howToEvolve: any
}

interface toEvolveData {
    value: string | number;
    need: string;
}

export function RowEvolve({ firstImage, firstName, secoundImage, secoundName, howToEvolve }: RowEvolveProps) {

    const [toEvolve, setToEvolve] = useState<toEvolveData>({} as toEvolveData)



    async function getToEvolve(details) {

        if (details?.min_happiness !== null) {
            setToEvolve({
                need: "happiness",
                value: details.min_happiness
            })
        }
        if (details?.item) {
            try {
                const item = (await api.get(`item/${details.item.name}`)).data
                setToEvolve({
                    need: "Item",
                    value: item?.sprites.default ? item?.sprites.default : '/noImageItem.png'
                })
            } catch (err) {
                console.log(err)
            }
        }
        if (details?.min_level !== null) {
            setToEvolve({
                need: "lvl",
                value: details.min_level
            })
        }
        if (details?.trigger.name === 'trade') {
            setToEvolve({
                need: details?.trigger.name,
                value: null
            })
        }

        if (details?.trigger.name === 'three-critical-hits') {
            setToEvolve({
                need: details?.trigger.name,
                value: null
            })
        }
        if (details?.location !== null) {
            setToEvolve({
                need: "Location",
                value: details?.location.name
            })
        }
        if (details?.known_move !== null) {
            setToEvolve({
                need: "Known move",
                value: details?.known_move.name
            })
        }
        if (details?.held_item !== null) {
            setToEvolve({
                need: "Held Item",
                value: details?.held_item.name
            })
        }
        if (details?.party_species !== null) {
            setToEvolve({
                need: "Party Species",
                value: details?.party_species.name
            })
        }
    }


    useEffect(() => {
        getToEvolve(howToEvolve)

    }, [])


    return (
        <Flex
            w="100%"
            align="center"
            justify="space-between"
            mb="1rem"
        >
            <ItemEvolve
                image={firstImage}
                text={firstName}
            />
            <Flex
                flexDir="column"
                align="center"
                w="100%"
            >
                <IoIosArrowRoundForward size="28" color="#eaeaea" />
                <Text
                    fontWeight={600}
                    color="#222"
                    fontSize="small"
                >
                    {toEvolve?.need === 'Item' ?
                        <Image src={String(toEvolve?.value)} maxW="30px" />
                        :
                        <Flex
                            flexDir="column"
                            align="center"
                            textAlign="center"
                        >
                            <Text
                                color="#7d7d7d"
                                textTransform="capitalize"
                                fontWeight={400}
                            >{toEvolve.need}</Text>
                            <Text>{toEvolve?.value}</Text>
                        </Flex>
                    }
                </Text>
            </Flex>
            <ItemEvolve
                image={secoundImage}
                text={secoundName}
            />
        </Flex>
    )
}