import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Highlight,
  SearchBox,
  Hits,
  Pagination,
  Configure,
} from 'react-instantsearch-dom';
import {
  GoogleMapsLoader,
  GeoSearch,
  Marker,
} from 'react-instantsearch-dom-maps';
import React from 'react';
import { API_KEY, APP_ID, MAPS_KEY } from './secrets';
import './App.css';
import PropTypes from 'prop-types';

const searchClient = algoliasearch(APP_ID, API_KEY);

const App = () => (
  <div>
    <InstantSearch indexName="AEROS" searchClient={searchClient}>
      <div className="container" style={{ width: 1500 }}>
        <header className="header">
          <h1 className="header-title">
            <a href="/">Airports</a>
          </h1>
          <p className="header-subtitle">
            {' '}
            <a href="https://github.com/algolia/react-instantsearch">
              Algolia InstantSearch
            </a>
          </p>
        </header>
        <div className="map_hits" style={{ height: 500, width: 1500 }}>
          <div style={{ height: 750, width: 600 }}>
            <GoogleMapsLoader apiKey={MAPS_KEY}>
              {google => (
                <GeoSearch
                  google={google}
                  // mapTypeId={google.maps.MapTypeId.SATELLITE}
                >
                  {({ hits }) => (
                    <div>
                      {hits.map(hit => (
                        <Marker key={hit.objectID} hit={hit} />
                      ))}
                    </div>
                  )}
                </GeoSearch>
              )}
            </GoogleMapsLoader>
          </div>

          <div className="search-panel">
            <div className="search-panel__results" style={{ width: 600 }}>
              <SearchBox
                className="searchbox"
                translations={{
                  placeholder: '',
                }}
              />
              <Hits hitComponent={Hit} />
              <Configure hitsPerPage={12} analytics={true} />
              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </InstantSearch>
  </div>
);

function Hit(props) {
  return (
    <div>
      <div className="hit-iata">
        <Highlight attribute="iata_code" hit={props.hit} />
      </div>
      <div className="hit-name">
        <Highlight attribute="name" hit={props.hit} />
      </div>

      <div className="hit-country">
        <Highlight attribute="city" hit={props.hit} />
        <Highlight attribute="country" hit={props.hit} />
      </div>
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default App;
