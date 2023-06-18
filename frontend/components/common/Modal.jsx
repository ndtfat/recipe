function Modal({ onConfirm = () => {}, text, disabled, children }) {
    return (
        <div>
            <button
                className="cursor-pointer group-hover:block"
                onClick={disabled ? null : () => window.my_modal_1.showModal()}
            >
                {children}
            </button>
            <dialog id="my_modal_1" className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Confirmation</h3>
                    <p className="py-4 text-left">{text}</p>
                    <div className="modal-action">
                        <button className="btn btn-sm">Cancel</button>

                        <button onClick={onConfirm} className="btn btn-sm bg-primary text-white hover:text-black">
                            Yes
                        </button>
                    </div>
                </form>
            </dialog>
        </div>
    );
}

export default Modal;
