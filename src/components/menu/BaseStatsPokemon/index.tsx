import { Flex } from "@chakra-ui/react"
import { BaseStats } from "../../../types/pokemon"
import { ItemStats } from "./ItemStats"

interface BaseStatsProps {
    stats: BaseStats[]
    color: string;
}

export function BaseStatsPokemon({ stats, color }: BaseStatsProps) {

    const total = stats.reduce((total, item) => {
        return total + Number(item.base_stat)
    }, 0)

    return (
        <Flex flexDir="column">
            {stats.map(item => {
                return (
                    <ItemStats
                        key={item.stat.name}
                        stats={Number(item.base_stat)}
                        title={item.stat.name}
                        color={color}
                    />
                )
            })}
            <ItemStats stats={total} total title='Total' />
        </Flex>
    )
}