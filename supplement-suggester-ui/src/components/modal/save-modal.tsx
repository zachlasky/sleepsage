import { Button, Modal } from 'flowbite-react';
import { HiCheckCircle } from 'react-icons/hi';

type TSaveModalProps = {
  item: string;
  onClose: () => void;
  onRedirect: () => void;
};

const SaveModal = ({ item, onClose, onRedirect }: TSaveModalProps) => {
  return (
    <Modal dismissible onClose={onClose} popup show size="md">
      <Modal.Header className="bg-darkest-purple" />
      <Modal.Body className="bg-darkest-purple">
        <div className="text-center">
          <HiCheckCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
          <h3 className="mb-5 text-lg font-normal text-lightest-purple">
            {item} was saved to your acount!
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="green" onClick={onRedirect}>
              Go to account
            </Button>
            <Button color="gray" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-darkest-purple" />
    </Modal>
  );
};

export { SaveModal };
