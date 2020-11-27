import React from "react";
import Header from "../../components/header";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { ContentContainer, Form, AdBlock } from "./styles";
import ShortenerService from "../../services/ShortnerService";
import vars from '../../configs/vars';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      url: "",
      code: "",
      errorMensage: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { url } = this.state;

    this.setState({ isLoading: true, errorMensage: "" });

    if (!url) {
      this.setState({
        isLoading: false,
        errorMensage: "Informe uma url válida para encurtar.",
      });
    } else {
      try {
        const service = new ShortenerService();
        const result = await service.generate({ url });

        this.setState({ isLoading: false, code: result.code });
      } catch (error) {
        this.setState({
          isLoading: false,
          errorMensage: "Ops, ocorreu um erro ao tentar encurtar a url.",
        });
      }
    }
  };

  copyToClipboard = () => {
    const element = this.inputURL;
    element.select();
    document.execCommand('copy');
  }

  render() {
    const { isLoading, errorMensage, code } = this.state;
    return (
      <Container>
        <Header>Seu novo encurtador de URL. :)</Header>
        <p className ="text-white-50"> Nosso Pitu é uma ferramenta gratuita para encurtar o link do seu evento, congresso, webinar, reunião virtual de trabalho, etc. Use o nosso encurtador de URL para diminuir uma url longa e gerar um link curto. Cole o link completo e clique no botão Encurtar. A seguir, copie a URL encurtada e compartilhe com seus contatos.</p>
        <ContentContainer>
          <Form onSubmit={this.handleSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Digite sua url para encurtar"
                defaultValue=""
                onChange={(e) => this.setState({ url: e.target.value })}
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit">
                  Encurtar
                </Button>
              </InputGroup.Append>
            </InputGroup>
            {isLoading ? (
              <Spinner animation="border" />
            ) : (
                code && (
                  <>
                    <InputGroup className="mb-3">
                      <FormControl
                        autoFocus={true}
                        defaultValue={vars.HOST_APP + code}
                        ref={(input) => this.inputURL = input}
                      />  
                      <InputGroup.Append>
                        <Button variant="outline-success" onClick={() => this.copyToClipboard()}>
                          Copiar
                      </Button>
                      </InputGroup.Append>
                    </InputGroup>
                    <p>Para acompanhar as estatísticas, acesse {vars.HOST_APP + code}/stats</p>
                  </>
                )
              )}
            {errorMensage && <Alert variant="danger">{errorMensage}</Alert>}
          </Form>
        </ContentContainer>
        <ContentContainer>
          <AdBlock>Adsense</AdBlock>
        </ContentContainer>
      </Container>
    );
  }
}

export default HomePage;
