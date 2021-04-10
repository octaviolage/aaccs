import React from 'react';

import { Navbar } from './Navbar';
import { Container } from './Container';
import { Footer } from './Footer';


function PageDefault({ children, paddingAll }) {
    return (
        <>
        <Navbar />
        <Container>
            {children}
        </Container>
        <Footer/>
        </>
    );
}

export { PageDefault };