import React from 'react'

const Modal = ({ data: { show, header, body, success, setshowmodal }, modalHandler }) => {
    const handler = () => {
        window.$(document).ready(() => {
            window.$('#modal').modal('show');
        });
    }
    return (
        <>
            <div className="modal fade" id="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="modal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" style={{ background: success ? "#e4ffe4" : "#fff2f2" }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">{header}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => modalHandler({ show: false, header: "", body: "", success: false })} />
                        </div>
                        <div className="modal-body">
                            {body}
                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                </div>
            </div>

            {show ? handler() : ''}
        </>
    )
}

export default Modal