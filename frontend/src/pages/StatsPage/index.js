import React from "react";
import Header from "../../components/header";
import { Container } from "react-bootstrap";
import ShortenerService from "../../services/ShortnerService";
import {parseISO, formatRelative} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from "./styles";

class StatsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      shortenedURL: {},
      errorMensage: '',
    }
  }

  async componentDidMount() {
      const {code} = this.props.match.params;

    try{
    
        const service = new ShortenerService();
        const shortenedURL = await service.getStats(code);

        const parsedDate = parseISO(shortenedURL.updatedAt);
        const currentDate = new Date();

        const relativeDate = formatRelative(parsedDate, currentDate, {
            locale: ptBR,
        });

        shortenedURL.relativeDate = relativeDate;   


        this.setState({isLoading: false, shortenedURL});

    } catch (error) {

        this.setState({isLoading: false, errorMensage: 'Ops, a url solicitada não existe.'});

    }

  }

  render() {
    const { errorMensage, shortenedURL } = this.state;

    return (
      <Container>
        <Header>Estatísticas:</Header>
        {errorMensage ? (
          <StatsContainer className="text-center">
            <FontAwesomeIcon
              size="3x"
              color="#ff3f4f"
              icon="exclamation-triangle"
            />
            <p className="m-3">{errorMensage}</p>
            <a className="btn btn-primary" href="/">
              Encurtar nova URL
            </a>
          </StatsContainer>
        ) : (
          <StatsContainer className="text-center">
            <p>
              <b>https://pitu.tk/{shortenedURL.code}</b>
            </p>
            <p>
              Redireciona para:
              <br />
              {shortenedURL.url}
            </p>
            <StatsRow>
              <StatsBox>
                <b>{shortenedURL.hits}</b>
                <StatsBoxTitle>Visitas</StatsBoxTitle>
              </StatsBox>
              <StatsBox>
                <b>{shortenedURL.relativeDate}</b>
                <StatsBoxTitle>Última visita do usuário.</StatsBoxTitle>
              </StatsBox>
            </StatsRow>
            <a className="btn btn-primary" href="/">
              Encurtar nova URL
            </a>
          </StatsContainer>
        )}
      </Container>
    );
  }
}

export default StatsPage;
