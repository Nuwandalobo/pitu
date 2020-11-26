import React from "react";
import Header from "../../components/header";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShortenerService from "../../services/ShortnerService";
import {StatsContainer} from "./styles";

class RedirectPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      url: '',
      errorMensage: '',
    };
  }

  async componentDidMount() {
    const { code } = this.props.match.params;

    try {
      const service = new ShortenerService();
      const { url } = await service.getLink(code);

      window.location = url;
    } catch (error) {
      this.setState({
        isLoading: false,
        errorMensage: "Ops, a url solicitada não existe;",
      });
    }
  }


  render() {
    const { errorMensage } = this.state;

    return (
      <Container>
        {errorMensage ? (
          <>
            <Header>
              Seu novo encurtador de urls.  :)

          </Header>
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
          </>
        ) : (
            <p className ='text-center'>Redirecionando...</p>

          )}
      </Container>
    )
  }
}

export default RedirectPage;
