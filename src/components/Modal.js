const Modal = ({ hideModal }) => {
	return (
		<div className="modal-container">
			<div className="modal">
				<div className="modal-content">
					<p>
						<strong>Error!</strong>
					</p>
					<p>Please select a valid country from the dropdown list.</p>
					<button onClick={hideModal}>Close</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
