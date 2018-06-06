// @flow

import React, { Fragment } from "react";
import styled from "styled-components";
import { Accordion, AccordionItem } from "components/Accordion";

type Props = {
  data: {}
};

console.log(React.version);

const IndexPage = ({ data }: Props) => (
  <Page>
    <Section className="Hero">
      <Wrapper>
        <Title>
          Rendiamo Retelit leader<br />dei servizi ICT alle imprese
        </Title>
        <Subtitle>Il futuro di Retelit nel B2B</Subtitle>
        <Paragraph>
          ASSEMBLEA DEI SOCI <br />
          27 APRILE 2018 - MILANO <br />
          <br />
          PALAZZO TURATI, VIA MERAVIGLI 9B, ORE 15
        </Paragraph>
      </Wrapper>
    </Section>

    <Section className="ElectionProgram">
      <Wrapper>
        <Title>
          Cambiare per<br />fare un salto di qualità
        </Title>
        <Subtitle>
          Crediamo che occorra cambiare passo nella gestione affinché Retelit
          possa fare un salto dimensionale e qualitativo
        </Subtitle>
        <ul className="Points">
          <li>
            <h3 className="title">B2B un’opportunità</h3>
            <div className="description">
              Fiber ritiene che il momento sia propizio per creare un operatore
              di servizi B2B italiano, anche in considerazione della
              discontinuità di offerta di servizi B2B da parte di altri
              operatori – elemento caratterizzante il mercato delle
              telecomunicazioni in Italia in questo periodo
            </div>
          </li>
          <li>
            <h3 className="title">Piano d’azione</h3>
            <div className="description">
              <ul>
                <li>Continuità di vendita dell’infrastruttura nazionale</li>
                <li>
                  Sviluppo di una strategia di vendita innovativa del cavo AA1
                </li>
                <li>
                  Nuova ed innovativa strategia di crescita dei servizi B2B alle
                  imprese attraverso:
                  <ul>
                    <li>
                      Lo sviluppo della customer base delle piccole e medie
                      imprese italiane attraverso una crescita organica
                    </li>
                    <li>
                      L’innovazione dell’offerta su cinque assi: (i)
                      connettività, (ii) servizi cloud, (iii) servizi di
                      comunicazione avanzata, (iv) servizi di cybersecurity e
                      (v) una suite SW in grado di integrare tutte le sue
                      componenti
                    </li>
                    <li>
                      Un Data Center Tier 4 per offrire servizi di TLC e IT
                      integrati, come sempre più spesso richiesto dalle imprese
                    </li>
                    <li>
                      L’iniezione nella società delle competenze necessarie a
                      consentire ad essa di fare un salto di qualità in termini
                      di conoscenza del business B2B, del business cavi
                      internazionale e delle nuove piattaforme tecnologiche di
                      gestione delle reti di telecomunicazioni
                    </li>
                  </ul>
                </li>
                <li>
                  Ogni opportunità deve essere colta sia direttamente che
                  indirettamente tramite operazioni straordinarie di M&A che
                  permettano a Retelit di essere un polo aggregante nel panorama
                  italiano sfruttando il proprio status di società quotata,
                  accelerando la crescita e permettendo il migliore sfruttamento
                  dell’infrastruttura
                </li>
              </ul>
            </div>
          </li>
          <li>
            <h3 className="title">Perchè Fiber 4.0</h3>
            <div className="description">
              <ul>
                <li>
                  Gli azionisti di Fiber 4.0, di nazionalità italiana, sono
                  imprenditori fortemente legati al progetto tanto da aver
                  costituito un apposito veicolo per definire una strategia di
                  lungo periodo che li vincolerà per i prossimi anni
                </li>
                <li>
                  Ha la volontà e la possibilità, anche finanziaria, di
                  sostenere il piano attraverso ulteriori investimenti
                </li>
                <li>
                  Si giova della collaborazione di un team con profonde
                  conoscenze del settore B2B, del business dei cavi
                  internazionali, della gestione di aziende complesse, di
                  acquisizione e integrazione di aziende sul territorio
                  italiano, che ha collaborato allo sviluppo del business plan
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </Wrapper>
    </Section>
    <Section className="Board">
      <Wrapper>
        <div className="square" />
        <Title>Board</Title>
        <Paragraph>
          Sono candidati alla nomina di componenti del Consiglio di
          Amministrazione soggetti in possesso di comprovata competenza e
          consolidata esperienza
        </Paragraph>
        <Accordion initialValue="Luca Cividini">
          <ol className="candidates">
            <li>
              <AccordionItem value="Luca Cividini">
                Attualmente consigliere di amministrazione in società operanti
                nei settori edilizia, immobiliare, alimentare, fonti
                rinnovabili, ha una forte esperienza imprenditoriale e di
                governance
              </AccordionItem>
            </li>
            <li>
              <AccordionItem value="Raffaele Mincione">
                Attualmente socio fondatore e amministratore di WRM Group,
                società di gestione patrimoniale e advisory rivolta agli
                investitori istituzionali e professionali, possiede importanti
                conoscenze di M&A in Italia e all’estero
              </AccordionItem>
            </li>
            <li>
              <AccordionItem value="Alessandro Talotta">
                Attualmente CEO di Telecom Italia Sparkle, e dal 2001 in Telecom
                Italia, è in possesso della migliore conoscenza disponibile sul
                mercato italiano del business TLC e ICT a livello
                internazionale, ha una grande conoscenza del settore B2B e una
                buona conoscenza dei servizi cloud
              </AccordionItem>
            </li>
            <li>
              <AccordionItem value="Davide Carando">
                Ha sviluppato la propria esperienza nel settore delle
                telecomunicazioni, tra le altre, presso la direzione generale di
                Unipol Sai S.p.A.
              </AccordionItem>
            </li>
            <li>
              <AccordionItem value="Andrea Costa">
                Attualmente socio fondatore e presidente di una società di
                partecipazione e sviluppo per il settore Fintech, per le
                applicazioni blockchain e per l’Internet of Things, che in
                precedenza vanta molteplici esperienze nel settore delle
                telecomunicazioni (tra cui Infracom Italia, Urmet
                Telecomunicazioni, Tellas), possiede un’approfondita conoscenza
                nel mercato della tecnologia e dei servizi innovativi, una
                grande conoscenza del settore B2B e una buona conoscenza dei
                servizi cloud
              </AccordionItem>
            </li>
            <li>
              <AccordionItem value="Valentina Montanari">
                Attualmente nel board di una società quotata, che in precedenza
                ha maturato un’expertise specifica a ricoprire incarichi
                manageriali e esecutivi di società quotate tra le quali Il Sole
                24 Ore, RCS MediaGroup, Albacom e AEM (oggi A2A), ha profonde
                conoscenze nel settore della tecnologia e dei business
                innovativi, anche nel settore B2B, e una comprovata esperienza
                di acquisizione e integrazione di aziende
              </AccordionItem>
            </li>
            <li>
              <AccordionItem value="Laura Rovizzi">
                Attualmente CEO di Open Gate Italia, già amministratore di
                Retelit dal gennaio 2015, possiede oltre 20 anni di esperienza
                nella pianificazione strategica e nello sviluppo commerciale di
                servizi innovativi e nuovi business, anche in aziende operanti
                in settori regolati (start up e aziende con ampi progetti di
                diversificazione e digital transformation), nonché esperienza in
                materia di M&A
              </AccordionItem>
            </li>
            <li>
              <AccordionItem value="Cristina Cengia">
                attualmente equity partner dello studio Morri Rossetti e
                Associati, nell’ambito del quale è responsabile del Dipartimento
                di Corporate, Finance e Capital Market, possiede una consolidata
                esperienza in operazioni di M&A e nell’ambito della compliance
                societaria
              </AccordionItem>
            </li>
            <li>
              <AccordionItem value="Luca Sintoni">
                Dal 2010 Professore a contratto di Bilancio e Analisi di
                Bilancio presso l’Università Bocconi, Dottore Commercialista e
                Revisore Legale in Milano, presta consulenza principalmente in
                materia fiscale, contabile e di M&A a primari soggetti
                industriali, di servizi e finanziari
              </AccordionItem>
            </li>
          </ol>
        </Accordion>
        <LinkButtonContainer>
          <LinkButton href="/assets/fiber-4.0-lista-candidati.pdf">
            SCARICA LA LISTA
          </LinkButton>
        </LinkButtonContainer>
        <LinkButtonContainer>
          <LinkButton href="/assets/fiber-4.0-cv.pdf">SCARICA I CV</LinkButton>
        </LinkButtonContainer>
      </Wrapper>
    </Section>
    <Section className="Vote">
      <Wrapper>
        <Title>Partecipa al voto</Title>
        <LinkButtonContainer>
          <LinkButton href="/assets/fiber-4.0-modulo-di-delega.pdf">
            SCARICA IL MODULO DELEGA
          </LinkButton>
        </LinkButtonContainer>
        <Paragraph>Chiamaci o scrivici per saperne di più</Paragraph>
        <div className="mail">info@fiber4retelit.it</div>
        <div className="phone"> +39 02 760 797 272 </div>
      </Wrapper>
    </Section>
    <Section className="AboutUs">
      <Wrapper>
        <Title>Dicono di noi</Title>
        <ul className="Articles">
          <li className="sectionArticle">
            Cordata italiana per il rinnovo del CdA di Retelit
            <ul>
              <li className="article">
                <a
                  href="https://www.lamiafinanza.it/it/sala-stampa/52720-fiber-4-0-presentata-la-lista-della-cordata-italiana-per-il-rinnovo-del-cda-di-retelit"
                  className="title"
                >
                  Fiber 4.0: presentata la lista della cordata italiana per il
                  rinnovo del CdA di Retelit
                </a>
                <div className="author">la mia finanza</div>
              </li>
              <li className="article">
                <a
                  href="https://www.corrierecomunicazioni.it/telco/retelit-nel-mirino-di-fiber-4-0-si-prepara-la-scalata/"
                  className="title"
                >
                  Retelit nel mirino di Fiber 4.0, si prepara la “scalata”?
                </a>
                <div className="author">CorCom</div>
              </li>
              <li className="article">
                <a
                  href="https://www.milanofinanza.it/news/retelit-ecco-la-lista-di-mincione-201804052138062171"
                  className="title"
                >
                  Retelit, ecco la lista di Mincione
                </a>
                <div className="author">Milano Finanza</div>
              </li>
            </ul>
          </li>
          <li className="sectionArticle">
            Ubi Banca e Luca Cividini protagonisti in Fiber 4.0
            <ul>
              <li className="article">
                <a
                  href="https://www.firstonline.info/retelit-il-9-della-cordata-mincione-e-in-pegno-a-ubi-banca/"
                  className="title"
                >
                  Retelit il 9% della cordata Mincione è in pegno a Ubi Banca
                </a>
                <div className="author">Fist Online</div>
              </li>
            </ul>
          </li>
        </ul>
      </Wrapper>
    </Section>
  </Page>
);

const Page = styled.div`
  padding-top: 160px;
  @media (max-width: 899px) {
    padding-top: 20px;
  }
`;

const Wrapper = styled.div`
  width: 960px;
  margin: 0 auto;
  position: relative;
  @media (max-width: 1000px) {
    width: 100%;
    padding-left: 40px;
    padding-right: 40px;
    box-sizing: border-box;
  }
  @media (max-width: 600px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

const Title = styled.h2`
  font-size: 50px;
  font-family: "Playfair Display", serif;
  padding: 0;
  margin: 0;
  @media (max-width: 700px) {
    font-size: 40px;
  }
  @media (max-width: 600px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
  font-size: 24px;
  font-family: "Roboto Condensed", serif;
  padding: 0;
  margin: 0;
  padding-top: 30px;
  @media (max-width: 700px) {
    font-size: 20px;
  }
`;

const Paragraph = styled.p`
  font-size: 16px;
  font-family: "Roboto Condensed", serif;
  padding: 0;
  margin: 0;
  padding-top: 30px;
  line-height: 1.4em;
  letter-spacing: 0.02em;
`;
const LinkButtonContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
const LinkButton = styled.a`
  display: inline-block;
  border: 1px solid #161338;
  height: 50px;
  padding-left: 50px;
  padding-right: 50px;
  box-sizing: border-box;
  padding-top: 15px;
  letter-spacing: 0.06em;
  text-decoration: none;
  color: #161338;
  &::after {
    content: "→";
    display: inline-block;
    padding-left: 10px;
    transition: 0.5s;
  }
  &:hover {
    cursor: pointer;
    &::after {
      padding-left: 20px;
      margin-right: -10px;
    }
  }
  @media (max-width: 400px) {
    height: 46px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 13px;
  }
`;

const Section = styled.section`
  width: 100%;
  padding-top: 100px;
  padding-bottom: 100px;
  overflow: hidden;
  &.Board {
    ${Title} {
      background-color: #fff;
      margin-top: 80px;
      margin-bottom: 40px;
      padding-bottom: 10px;
      display: inline-block;
      z-index: 1;
      position: relative;
      padding-top: 5px;
    }
    .square {
      width: calc(100% - 90px);
      right: 0;
      height: 100%;
      position: absolute;
      z-index: 0;
      border: solid 10px #1e83ef;
      @media (max-width: 1000px) {
        right: 30px;
        width: calc(100% - 120px);
      }
      @media (max-width: 540px) {
        right: -20px;
        width: calc(100% - 50px);
      }
      @media (max-width: 340px) {
        right: -20px;
        width: calc(100% - 30px);
      }
    }
    ${Paragraph} {
      padding-left: 140px;
      padding-right: 40px;
      padding-top: 0;
      z-index: 1;
      position: relative;
      @media (max-width: 700px) {
        padding-left: 90px;
      }
      @media (max-width: 540px) {
        padding-left: 60px;
        padding-right: 0px;
      }
      @media (max-width: 340px) {
        padding-left: 40px;
      }
    }
    .candidates {
      padding-left: 140px;
      padding-right: 40px;
      padding-top: 0;
      z-index: 1;
      position: relative;
      margin: 20px 0;
      @media (max-width: 700px) {
        padding-left: 120px;
        margin-bottom: 30px;
        padding-right: 40px;
      }
      @media (max-width: 540px) {
        padding-left: 80px;
        padding-right: 0;
      }
      li {
        padding-top: 10px;
        padding-top: 10px;
        letter-spacing: 0.02em;
        button {
          background: transparent;
          border: none;
          padding-left: 0;
          font-weight: 700;
          outline: none;
          position: relative;
          :hover {
            cursor: pointer;
          }
          ::after {
            content: "i";
            display: inline-block;
            background-color: #161338;
            color: #fff;
            font-size: 12px;
            height: 16px;
            width: 16px;
            position: absolute;
            box-sizing: border-box;
            font-weight: 400;
            padding-top: 2px;
            border-radius: 10px;
            right: -15px;
            top: 2px;
            opacity: 0.5;
          }
        }
        div > div {
          padding-top: 5px;
        }
      }
    }
    ${LinkButtonContainer} {
      text-align: right;
      padding-left: 140px;
      padding-right: 40px;
      padding-bottom: 20px;
      z-index: 1;
      position: relative;
      @media (max-width: 540px) {
        padding-right: 0px;
        padding-left: 20px;
      }
    }
  }

  &.ElectionProgram {
    .Points {
      list-style: none;
      margin: 0;
      padding-left: 0;
      padding-top: 50px;
      > li {
        position: relative;
        padding-left: 110px;
        &:before {
          display: block;
          position: absolute;
          content: "";
          height: 10px;
          width: 90px;
          background-color: #1e83ef;
          left: 0;
          top: 12px;
        }
        li {
          padding-top: 4px;
          padding-bottom: 4px;
          ul {
            padding-top: 10px;
          }
        }
        .title {
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 0.02em;
        }
      }
    }
    @media (max-width: 1000px) {
      .Points {
        > li {
          padding-left: 80px;
          &:before {
            width: 60px;
          }
          li {
            ul {
              padding-left: 15px;
            }
          }
          .title {
            font-size: 30px;
          }
        }
      }
    }
    @media (max-width: 600px) {
      .Points {
        > li {
          padding-left: 30px;
          &:before {
            width: 10px;
          }
        }
      }
    }
    @media (max-width: 500px) {
      .Points {
        > li {
          padding-left: 0;
          &:before {
            top: 8px;
          }
          .title {
            font-size: 24px;
            margin-left: 30px;
          }
          ul {
            padding-left: 20px;
          }
        }
      }
    }
  }
  &.Vote {
    background: rgb(30, 131, 239);
    background: linear-gradient(
      140deg,
      rgba(30, 131, 239, 1) 0%,
      rgba(72, 64, 187, 1) 100%
    );
    color: #fff;
    ${Title} {
      text-align: center;
      padding-bottom: 60px;
    }
    ${LinkButtonContainer} {
      text-align: center;
      ${LinkButton} {
        text-decoration: none;
        color: #fff;
        border: 1px solid #fff;
        @media (max-width: 360px) {
          padding-right: 20px;
          padding-left: 20px;
          &::after {
            display: none;
          }
        }
      }
    }
    ${Paragraph} {
      text-align: center;
      padding-top: 50px;
    }
    .mail {
      font-weight: 300;
      font-size: 52px;
      text-align: center;
      padding-top: 60px;
      @media (max-width: 600px) {
        font-size: 40px;
      }
      @media (max-width: 400px) {
        font-size: 32px;
      }
    }
    .phone {
      font-weight: 300;
      font-size: 52px;
      text-align: center;
      @media (max-width: 600px) {
        font-size: 40px;
      }
      @media (max-width: 400px) {
        font-size: 32px;
      }
    }
  }
  &.AboutUs {
    .Articles {
      margin: 0;
      list-style: none;
      padding: 0;

      padding-top: 80px;
      @media (max-width: 600px) {
        padding-left: 0px;
      }
      .sectionArticle {
        font-size: 32px;
        font-weight: 700;
        letter-spacing: 0.02em;
        @media (max-width: 600px) {
          font-size: 24px;
        }
        ul {
          list-style: none;
          padding: 0;
          padding-top: 40px;
          .article {
            padding-bottom: 50px;
            padding-left: 40px;
            @media (max-width: 600px) {
              padding-bottom: 30px;
              padding-left: 30px;
            }
            :last-child {
              padding-bottom: 80px;
            }
            .title {
              font-size: 24px;
              font-weight: 700;
              text-decoration: none;
              color: #161338;
              transition: 0.3s;
              display: block;
              @media (max-width: 600px) {
                font-size: 18px;
              }
              :hover {
                color: #1e83ef;
              }
            }
            .author {
              font-size: 18px;
              padding-top: 5px;
              color: #1e83ef;
              @media (max-width: 600px) {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
