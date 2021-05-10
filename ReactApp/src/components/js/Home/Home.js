import React, { useEffect } from "react";
import Rellax from "rellax";
import HomeStart from "./HomeStart";
import Content from "./Content";
import Features from "./Features";

function Home(props) {
    useEffect(() => {
        new Rellax('.rellax');
    });
    return (
        <React.Fragment>
            <HomeStart signedIn={props.signedIn} />
            <Content type={'A'} style={{ marginBottom: '20vh' }}>
                <h3>Scopul Nostru</h3>
                <p>Asigurarea sprijinului de care ai nevoie
	În cazul în care cantitatea de teme atribuită devine copleșitoare, comunitatea Brainer îți vine în ajutor.
    Tot ceea ce îți cerem este sa îți impartășești la randul tău cunoștinșele despre domeniile tale preferate.
    Ai ocazia de a intra in contact cu persoane motivate sa iți ofere suportul necesar pentru finalizarea  exercițiilor care iți dau batai de cap, iar tu contribui la dezvoltarea comunității noastre.
    Daca ideea ți se pare interesanta, nu ezita si creează-ți un cont chiar acum pentru a da startul imbunătățirii aptitudinilor tale la disciplinele care ți s-au părut încă de la inceput imposibil de cucerit.
    Brainer va fi in tot acest timp alături de tine!
   </p>

            </Content>
            <Content type={'E'} style={{ marginBottom: '20vh' }}>
                <p> </p>
        
            </Content>
            <Features />
        </React.Fragment>
    );
}

export default Home;