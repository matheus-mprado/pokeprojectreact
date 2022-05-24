import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Button, ModalFooter, useDisclosure, Text, Input } from "@chakra-ui/react";
import { ColorsData } from "../../../../types/pokemon";

interface ModalGotchPokemon {
    onClose: () => void;
    isOpen: boolean;
    onSetNamePokemon: (name: string) => void;
    namePokemon: string;
    colors: ColorsData;
    onClick: () => void;
}

export function ModalGotchPokemon({ onClose, isOpen, onSetNamePokemon, namePokemon, colors, onClick }: ModalGotchPokemon) {

    function handleSavePokemon() {
        onClick()
        onClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={false}
            size="xs"
            isCentered
        >
            <ModalOverlay />
            <ModalContent

            >
                <ModalHeader>
                    <Text
                        fontSize="1rem"
                    >
                        Choose a name
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input
                        value={namePokemon}
                        onChange={e => onSetNamePokemon(e.target.value)}
                        borderBottomColor={colors.primary}
                    />
                </ModalBody>

                <ModalFooter>
                    <Button
                        bg="transparent"
                        onClick={handleSavePokemon}
                    >
                        Complete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}