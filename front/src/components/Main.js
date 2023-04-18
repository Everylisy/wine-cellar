import styled from 'styled-components';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Footer from './Home/Footer';
import FirstSection from './Home/FirstSection';
import SecondSection from './Home/SecondSection';
import ThirdSection from './Home/ThirdSection';

function Main() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>메인 | 와인셀러</title>
        </Helmet>
      </HelmetProvider>

      <MainContainer>
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <Footer />
      </MainContainer>
    </>
  );
}

export default Main;

const MainContainer = styled.div`
  height: auto;
`;
