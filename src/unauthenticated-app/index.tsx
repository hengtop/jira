import { LoginScreen } from "screens/login";
import { Container, ShadowCard, Header, Background } from "./style";

export default function Index() {
  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <LoginScreen />
      </ShadowCard>
    </Container>
  );
}
