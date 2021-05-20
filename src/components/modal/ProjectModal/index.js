import React, { useState } from 'react';
import styled from 'styled-components';

const Modal = styled.div`
    display: block;
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
`;

Modal.Content = styled.div`
    background-color: #fefefe;
    margin: auto;
    margin-top: 0;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
`;

Modal.Close = styled.span`
    color: #a0a0a0;
    float: right;
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    vertical-align: middle;
    margin-top: -8px;

    &:hover,:focus {
        color: #EBEBEB;
        text-decoration: none;
        cursor: pointer;
    }
`;

Modal.Title = styled.div`
    width: 80%;
    background-color: var(--secondary);
    font-size: 15px;
    color: white;
    margin-top: 0;
    margin-bottom: 0;
    padding: 5px;
    margin: auto;
`;

Modal.Image = styled.img`
    display: block;
    width: 80%;
    background-color: var(--secondary);
    padding: 1px;
    color: white;
    margin: auto;
    margin-bottom: 15px;
`;

export function ProjectModal({title, img, content, children}) {

    const [open, setOpen] = useState(false);
    function handleClick(event) {
        const value = open? false : true;
        setOpen(value)
        console.log(open)
    }

    if (open) {
        return (
            <>
                <Modal.Trigger onClick={handleClick}>
                    {children}
                </Modal.Trigger>
            </>
        )
    }
    else {
        return (
            <>
                <Modal.Trigger onClick={handleClick}>
                    {children}
                    <Modal>
                        <Modal.Title>{title}
                            <Modal.Close onClick={handleClick}>&times;</Modal.Close>
                        </Modal.Title>
                        <Modal.Content>
                        <Modal.Image src={img} />
                            {content}
                        </Modal.Content>
                    </Modal>
                </Modal.Trigger>
            </>
        )

    }

}