import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";

export function ModalAlreadyHavePokemon({ isAlreadyExists, setIsAlreadyExists }) {

    const { onClose } = useDisclosure()

    function handleClose(){
        setIsAlreadyExists(false)
    }

    return (
        <Modal
            isOpen={isAlreadyExists}
            onClose={handleClose}
            closeOnOverlayClick={false}
            size="xs"
            isCentered
        >
            <ModalOverlay />
            <ModalContent

            >

                <ModalCloseButton />
                <ModalBody
                    px="4"
                    mt="3rem"
                >
                    <Text>
                        You already have this pokemon 🔥
                    </Text>
                </ModalBody>

                <ModalFooter
                    px="4"
                >
                    <Button
                        bg="transparent"
                        onClick={handleClose}
                        
                    >
                        ok
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}