import Modal from 'react-modal';

type ErrorModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
    errorMessage: string | null;
  };

export default function ErrorModal({ isOpen, onRequestClose, errorMessage }: ErrorModalProps) {

  const handleRefresh = () => {
    window.location.reload();
};

    return (
    <Modal
    isOpen={isOpen} 
    onRequestClose={onRequestClose}
    style={{
        overlay: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          position: 'relative',
          top: 'auto',
          left: 'auto',
          right: 'auto',
          bottom: 'auto',
          width: '80%',
          maxWidth: '500px',
          height: 'fit-content', 
        }
      }}>
        <h2 className="modal-header">Oops something went wrong!</h2>
            <div className={`errmodal ${isOpen ? 'is-open' : ''}`}>
                <div className="errmodal-content">
                    <p>{errorMessage}</p>
                    <hr className="my-4"/> 
                    <div className="text-center"> 
                        <button onClick={handleRefresh} className="modal-refresh-button bg-blue-500 text-white p-1 rounded hover:bg-blue-600">Refresh Page</button>
                    </div>
                    <button onClick={onRequestClose} className="modal-close-button bg-red-500 bg-opacity-60 text-white p-1 rounded hover:bg-red-600 absolute top-4 right-4">Close</button>
                </div>
            </div>
        </Modal>
    );
  }
  