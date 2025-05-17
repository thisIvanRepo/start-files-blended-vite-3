import { Link, useLocation } from 'react-router-dom';
import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';

const CountryList = ({ countries }) => {
  const location = useLocation();
  return (
    <Grid>
      {countries.map(countrie => {
        return (
          <GridItem key={countrie.id}>
            <Link to={`/country/${countrie.id}`} state={location}>
              <img src={countrie.flag} alt={countrie.countrie} />
            </Link>
          </GridItem>
        );
      })}
    </Grid>
  );
};
export default CountryList;
