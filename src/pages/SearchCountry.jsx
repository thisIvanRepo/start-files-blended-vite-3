import { useSearchParams } from 'react-router-dom';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import SearchForm from '../components/SearchForm/SearchForm';
import Section from '../components/Section/Section';
import { useEffect, useState } from 'react';
import { fetchByRegion } from '../service/countryApi';
import CountryList from '../components/CountryList/CountryList';
import Loader from '../components/Loader/Loader';

const SearchCountry = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const region = searchParams.get('region');
    if (!region) return;

    const getRegion = async () => {
      setIsLoading(true);
      try {
        const data = await fetchByRegion(region);
        setCountries(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getRegion();
  }, [searchParams]);

  const onSubmit = region => {
    setSearchParams({
      region,
    });
  };

  return (
    <Section>
      <Container>
        <SearchForm onSubmit={onSubmit} />
        {isLoading && <Loader />}
        {countries.length > 0 && <CountryList countries={countries} />}
      </Container>
    </Section>
  );
};

export default SearchCountry;
