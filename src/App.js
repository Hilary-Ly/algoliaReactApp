import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Highlight, SearchBox, Hits } from 'react-instantsearch-dom';
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
  <InstantSearch indexName="AEROS" searchClient={searchClient}>
    <div style={{ height: 500, width: 1000 }}>
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
      <SearchBox
        className="searchbox"
        translations={{
          placeholder: '',
        }}
      />
      <Hits hitComponent={Hit} />
    </div>
  </InstantSearch>
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

// import {
//   InstantSearch,
//   Hits,
//   SearchBox,
//   Pagination,
//   Highlight,
//   // ClearRefinements,
//   // RefinementList,
//   // Configure,
// } from 'react-instantsearch-dom';


// class App extends Component {
//   render() {
//     return (
//       <div>
//         <header className="header">
//           <h1 className="header-title">
//             <a href="/">Airports</a>
//           </h1>
//           <p className="header-subtitle">
//             {' '}
//             <a href="https://github.com/algolia/react-instantsearch">
//               Algolia InstantSearch
//             </a>
//           </p>
//         </header>

//         {/* <div style={{ height: 500 }}>
//           <GoogleMapsLoader apiKey="APIKEY">
//             {google => (
//               <GeoSearch google={window.google}>
//                 {({ hits }) => (
//                   <div>
//                     <Control />
//                     {hits.map(hit => (
//                       <Marker key={hit.objectID} hit={hit} />
//                     ))}
//                   </div>
//                 )}
//               </GeoSearch>
//             )}
//           </GoogleMapsLoader>
//         </div> */}

//         <div className="container">
//           <InstantSearch searchClient={searchClient} indexName="AEROS">
//             <div className="search-panel">
//               <div className="search-panel__results">
//                 <SearchBox
//                   className="searchbox"
//                   translations={{
//                     placeholder: '',
//                   }}
//                 />
//                 <Hits hitComponent={Hit} />

//                 <div className="pagination">
//                   <Pagination />
//                 </div>
//               </div>
//             </div>
//           </InstantSearch>
//         </div>
//       </div>
//       <InstantSearch indexName="AEROS" searchClient={searchClient}>
//     <div style={{ height: 500 }}>
//       <GoogleMapsLoader apiKey="APIKEY">
//         {google => (
//           <GeoSearch
//             google={google}
//             mapTypeId={google.maps.MapTypeId.SATELLITE}
//           >
//             {({ hits }) => (
//               <div>
//                 {hits.map(hit => <Marker key={hit.objectID} hit={hit} />)}
//               </div>
//             )}
//           </GeoSearch>
//         )}
//       </GoogleMapsLoader>
//     </div>
//   </InstantSearch>
//     );
//   }
// }
