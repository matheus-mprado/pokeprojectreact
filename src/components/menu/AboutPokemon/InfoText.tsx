import { Flex } from "@chakra-ui/react";
import { Abilities } from "../../../types/pokemon";
import { TitleInfo } from '../../core/TitleInfo'
import { ValueInfo } from "../../core/ValueInfo";

interface InfoTextProps {
    title: string;
    info?: string;
    abilities?: Abilities[];
}

export function InfoText({ title, info, abilities }: InfoTextProps) {
    return (
        <Flex
            align="baseline"
            mb="1rem"
            textTransform="capitalize"
        >

            <TitleInfo text={title} />

            {!abilities ?
                <ValueInfo value={info} />

                :
                abilities.map((item,index) => {
                    if(index == 2){
                        return
                    }
                    return (
                        <ValueInfo
                            key={item.ability.name}
                            value={item.ability.name}
                            mr="0.5rem"
                            color="#333"
                            fontSize="0.85rem"
                            fontWeight={600}
                        />
                    )
                })
            }

        </Flex>
    )
}