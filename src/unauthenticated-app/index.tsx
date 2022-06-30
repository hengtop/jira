import { LoginScreen } from "screens/login";
import { Container, ShadowCard, Header, Background } from "./style";
import { Helmet } from "react-helmet";

export default function Index() {
  return (
    <Container>
      {/*  <Helmet>
        <title>请登录以继续</title>
      </Helmet> */}
      <Header />
      <Background />
      <ShadowCard>
        <LoginScreen />
      </ShadowCard>
    </Container>
  );
}
