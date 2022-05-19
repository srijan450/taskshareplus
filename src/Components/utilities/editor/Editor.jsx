import Quill from "quill";
import "quill/dist/quill.snow.css"
import React, { useCallback, useEffect } from 'react'
import "./editor.css"

var toolbarOptions = [
    [{ 'header': [false, 3, 4] }],
    [{ 'font': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }],
    ['bold', 'italic', 'underline'],
    [{ 'align': [] }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    ['link']
];
const Editor = ({ quill, setquill, setfdata, fdata }) => {

    useEffect(() => {
        if (quill == null)
            return;
        quill.on('text-change', () => {
            setfdata((pre) => {
                return { ...pre, body: quill.root.innerHTML }
            });
        })

        return () => {
            quill.off('text-change')
        }
    }, [quill]);

    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null)
            return
        wrapper.innerHTML = fdata.body;
        const editor = document.createElement('div');
        wrapper.append(editor);
        const quil = new Quill(wrapper, {
            theme: "snow",
            modules: {
                toolbar: toolbarOptions
            }
        });
        setquill(quil);
    }, [])



    return (
        <div className='form-control p-0 m-0 border-0' style={{ height: "fit-content" }}>
            <div ref={wrapperRef} className='w-100'>
            </div>
        </div>

    )
}

export default Editor