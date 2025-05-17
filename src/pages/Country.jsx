import { useLocation, useParams } from 'react-router-dom';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Section from '../components/Section/Section';
import { useEffect, useRef, useState } from 'react';
import { fetchCountry } from '../service/countryApi';
import CountryInfo from '../components/CountryInfo/CountryInfo';
import GoBackBtn from '../components/GoBackBtn/GoBackBtn';
import Loader from '../components/Loader/Loader';

const Country = () => {
  const { countryId } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);
  const location = useLocation();
  const goBackLink = useRef(location.state || '/');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCounryInfo = async id => {
      try {
        setIsLoading(true);
        const data = await fetchCountry(id);
        setCountryInfo(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCounryInfo(countryId);
  }, [countryId]);

  return (
    <Section>
      <Container>
        {isLoading && <Loader />}
        <GoBackBtn path={goBackLink.current} />
        {error && <Heading title={error} bottom />}
        {countryInfo && <CountryInfo {...countryInfo} />}
      </Container>
    </Section>
  );
};

export default Country;
